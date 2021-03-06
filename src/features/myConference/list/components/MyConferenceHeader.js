import { Typography } from '@bit/totalsoft_oss.react-mui.kit.core'
import { Grid, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const useStyle = makeStyles((theme)=>({title:{...theme.header.title, width:'100%'}}))


const MyConferencesHeader = (props) => {
    const { title, actions } = props
    const classes = useStyle()

    return <Grid container justifyContent='flex-start' alignItems='center'>
        <Grid item sx={6} sm={9} lg={9} container justifyContent='flex-start'>
            <Typography variant={'subtitle1'} className={classes.title }>{title}</Typography>
        </Grid>
        <Grid item xs={3} sm={3} lg={3} container justifyContent='flex-end' spacing={1}>
            {actions}
        </Grid>
    </Grid>
}



MyConferencesHeader.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.node
}

export default MyConferencesHeader