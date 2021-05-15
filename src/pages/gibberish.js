import Typography from '@material-ui/core/Typography';
import React, {useEffect} from "react";
import History from "../History";

export default function Gibberish({location}) {
    const [greetingName, setGreetingName] = React.useState('there')
    const [initialLoad, setInitialLoad] = React.useState(0)

    const updateHistory = () => {
        const pushUrl = `/gibberish?name=${greetingName}`
        History.push(pushUrl)
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        if (initialLoad === 0) {
            const queryParamName = params.get('name')
            setGreetingName(queryParamName ? queryParamName : 'there')
            setInitialLoad(1)
        } else {
            updateHistory()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        greetingName
    ])

    return (
        <div>
            <Typography variant="h1">
                Gibberish
            </Typography>
            <Typography variant="h2" gutterBottom>
                Hello {greetingName}!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
        </div>
    )
}
