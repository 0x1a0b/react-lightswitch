export default function VariablesGetCRAContextRoot() {
    if (window.CRA_CONTEXTROOT) {
        return window.CRA_CONTEXTROOT
    } else {
        return '/ct_unset_error/'
    }
}