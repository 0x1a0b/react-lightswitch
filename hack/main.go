package main

import (
	"encoding/json"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"sort"
	"strconv"
	"time"
)

func init() {
	log.SetLevel(log.DebugLevel)
	log.SetFormatter(&log.JSONFormatter{})
}

func main() {
	t := MockItemTree()
	graf = NewGraf(t)
	WriteToFile(graf)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge: 12 * time.Hour,
	}))
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/object", func(c *gin.Context) {
		c.JSON(200, graf)
	})
	bindErr := r.Run("0.0.0.0:4050")
	if bindErr != nil {
		panic(bindErr)
	}
}

type (
	SvgBox struct {
		Id string `json:"id"`
		Content string `json:"content"`
		Coordinates []int `json:"coordinates"`
		Readonly bool `json:"disableDrag"`
	}
	SvgLineConnector struct {
		Input string `json:"input"`
		Output string `json:"output"`
		Readonly bool `json:"readonly"`
	}
	Schema struct {
		Nodes []SvgBox `json:"nodes"`
		Links []SvgLineConnector `json:"links"`
	}
	Graf struct {
		Schema    Schema `json:"schema"`
		Title     string `json:"title"`
		Height    string `json:"height"`
		MinLength string `json:"minlength"`
	}
	ItemTree struct {
		InstanceBind struct {
			Name string
			Vhosts []struct {
				Name string
			}
			ServiceGroups []struct {
				Name string
				Ips []struct {
					Name string
					ARecords []struct {
						Name string
						CnameRecords []struct {
							Name string
						}
					}
				}
			}
		}
	}
	ItemCounter struct {
		Vhosts int
		ServiceGroups int
		Ips int
		ARecords int
		CNames int
	}
)

const (
	Output = "C:/Users/p/dev/react-lightswitch/src/mock/processor-out.json"
)

var (
	graf Graf
)

func MockItemTree() (t ItemTree) {
	inputObject := `{"InstanceBind": {
  "Name": "blabla",
  "Vhosts": [
    { "Name": "Vhost1"},
    { "Name": "Vhost2"},
    { "Name": "Vhost3"}
  ],
  "ServiceGroups": [
    { "Name": "svg1",
      "Ips": [
        {
          "Name": "127.0.0.1",
          "ARecords": [
            {
              "Name": "a1.ip1",
              "CnameRecords": [
                {
                  "Name": "cname1.a1.ip1"
                },
                {
                  "Name": "cname2.a1.ip1"
                }
              ]
            }
          ]
        },
        {
          "Name": "127.0.0.2",
          "ARecords": [
            {
              "Name": "a1.ip2",
              "CnameRecords": [
                {
                  "Name": "cname1.a1.ip2"
                }
              ]
            },
            {
              "Name": "a2.ip2",
              "CnameRecords": [
                {
                  "Name": "cname1.a2.ip2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}}`
	unpackErr := json.Unmarshal([]byte(inputObject), &t)
	if unpackErr != nil {
		panic(unpackErr)
	}
	return
}

func NewGraf(t ItemTree) (g Graf) {
	boxes := make([]SvgBox, 0)
	lines := make([]SvgLineConnector, 0)
	g = Graf{
		Title: t.InstanceBind.Name,
		Schema: Schema{
			Links: lines,
			Nodes: boxes,
		},
	}
	height, steps, counter := heightForMaxItems(t)
	DistributeElements(&g, t, counter, height, steps)
	g.Height = strconv.Itoa(height) + "px"

	return
}

func DistributeElements(g *Graf, t ItemTree, c ItemCounter, height int, steps int) () {
	// X Rows

	xCName := 50
	xARecord := 220
	xIp := 400
	xSvg := 520
	xInstB := 640
	xVhost := 740

	// Y Starters
    middle := height / 2 - steps / 2
	vHostsYstartAt := StartAt(c.Vhosts, steps, height)
	svgYstartAt := StartAt(c.ServiceGroups, steps, height)
	ipYstartAt := StartAt(c.Ips, steps, height)
	aYstartAt := StartAt(c.ARecords, steps, height)
	cnameYstartAt := StartAt(c.CNames, steps, height)

    nodeInst := SvgBox{
    	Coordinates: []int{xInstB, middle},
    	Id: "inst-" + t.InstanceBind.Name,
    	Content: t.InstanceBind.Name,
    	Readonly: true,
	}

	g.Schema.Nodes = append(g.Schema.Nodes, nodeInst)

	for _, vhost := range t.InstanceBind.Vhosts {
		nodeVhost := SvgBox{
			Coordinates: []int{xVhost, vHostsYstartAt},
			Id: "vhost-" + vhost.Name,
			Content: vhost.Name,
			Readonly: true,
		}
		vHostsYstartAt += steps
		g.Schema.Nodes = append(g.Schema.Nodes, nodeVhost)
		lineVhostToInst := SvgLineConnector{
			Input: nodeVhost.Id,
			Output: nodeInst.Id,
			Readonly: true,
		}
		g.Schema.Links = append(g.Schema.Links, lineVhostToInst)
	}

	for _, svg := range t.InstanceBind.ServiceGroups {
		nodeSvg := SvgBox{
			Coordinates: []int{xSvg, svgYstartAt},
			Id: "svg-" + svg.Name,
			Content: svg.Name,
			Readonly: true,
		}
		svgYstartAt += steps
		g.Schema.Nodes = append(g.Schema.Nodes, nodeSvg)
		lineSvgToInst := SvgLineConnector{
			Input: nodeSvg.Id,
			Output: nodeInst.Id,
			Readonly: true,
		}
		g.Schema.Links = append(g.Schema.Links, lineSvgToInst)

		for _, ip := range svg.Ips {
			nodeIp := SvgBox{
				Coordinates: []int{xIp, ipYstartAt},
				Id: "ip-" + ip.Name,
				Content: ip.Name,
				Readonly: true,
			}
			ipYstartAt += steps
			g.Schema.Nodes = append(g.Schema.Nodes, nodeIp)
			lineIpToSvg := SvgLineConnector{
				Input: nodeSvg.Id,
				Output: nodeIp.Id,
				Readonly: true,
			}
			g.Schema.Links = append(g.Schema.Links, lineIpToSvg)

			for _, arec := range ip.ARecords {
				nodeArec := SvgBox{
					Coordinates: []int{xARecord, aYstartAt},
					Id: "arec-" + arec.Name,
					Content: arec.Name,
					Readonly: true,
				}
				aYstartAt += steps
				g.Schema.Nodes = append(g.Schema.Nodes, nodeArec)
				lineArecToIp := SvgLineConnector{
					Input: nodeIp.Id,
					Output: nodeArec.Id,
					Readonly: true,
				}
				g.Schema.Links = append(g.Schema.Links, lineArecToIp)

				for _, cname := range arec.CnameRecords {
					nodeCname := SvgBox{
						Coordinates: []int{xCName, cnameYstartAt},
						Id: "cname-" + cname.Name,
						Content: cname.Name,
						Readonly: true,
					}
					cnameYstartAt += steps
					g.Schema.Nodes = append(g.Schema.Nodes, nodeCname)
					lineCnameToArec := SvgLineConnector{
						Input: nodeCname.Id,
						Output: nodeArec.Id,
						Readonly: true,
					}
					g.Schema.Links = append(g.Schema.Links, lineCnameToArec)
				}
			}
		}
	}

}

func StartAt(count int, steps int, height int) int {
	spaceTaken := count * steps - steps
	spaceNotTaken := height - spaceTaken
	return spaceNotTaken / 2 - steps / 2
}

func heightForMaxItems(t ItemTree) (height int, multiply int, counters ItemCounter) {
	minHeight := 2
	multiply = 50

	vhostCount := len(t.InstanceBind.Vhosts)
	svgGroupCount := len(t.InstanceBind.ServiceGroups)
	ipCount := 0
	aRecCount := 0
	cnameRecCount := 0
	for _, svg := range t.InstanceBind.ServiceGroups {
		ipCount += len(svg.Ips)
		for _, ip := range svg.Ips {
			aRecCount += len(ip.ARecords)
			for _, arec := range ip.ARecords {
				cnameRecCount += len(arec.CnameRecords)
			}
		}
	}

	mostObjects := BiggestNumber([]int{minHeight, vhostCount, svgGroupCount, ipCount, aRecCount, cnameRecCount})
	counters = ItemCounter{
		Vhosts: vhostCount,
		ServiceGroups: svgGroupCount,
		Ips: ipCount,
		ARecords: aRecCount,
		CNames: cnameRecCount,
	}

	height = mostObjects * multiply + multiply

	log.WithFields(log.Fields{
		"ip_count": ipCount,
		"arec_count": aRecCount,
		"cname_count": cnameRecCount,
		"vhost_count": vhostCount,
		"svg_count": svgGroupCount,
		"highest": mostObjects,
		"height": height,
		"multiply": multiply,
	}).Debug("Canvas calculation finished")

	return
}

func BiggestNumber(slc []int) int {
	sort.Ints(slc)
	return slc[5]
}

func WriteToFile(g Graf) {
	file, jsonErr := json.MarshalIndent(g, "", "    ")
	if jsonErr != nil {
		panic(jsonErr)
	}

	ioErr := ioutil.WriteFile(Output, file, 0644)
	if ioErr != nil {
		panic(ioErr)
	}
}
