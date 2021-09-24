import React from 'react'
import { Td, Tr } from 'react-super-responsive-table'
import PropTypes from 'prop-types'
import { Checkbox, makeStyles } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import DeleteButton from '@bit/totalsoft_oss.react-mui.delete-button'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles()
const MyConferenceSpeakerData = (props) =>{
const {t}=useTranslation()
const {speaker, dispatch, index} = props
const classes = useStyles()

return (
<Tr>
    <Td className={classes.tableContent}><CustomTextField fullWidth/></Td>
    <Td className={classes.tableContent}><CustomTextField fullWidth/></Td>
    <Td className={classes.tableContent}><CustomTextField fullWidth/></Td>
    <Td className={classes.tableContent}><Checkbox color='secondary' /></Td>
    <Td className={classes.tableContent}><DeleteButton title={t('General.Buttons.DeleteSpeaker')} size='small'/></Td>
</Tr>

)
}
MyConferenceSpeakerData.propTypes={
    speaker:PropTypes.object,
    dispatch:PropTypes.func,
    index:PropTypes.number
}

export default MyConferenceSpeakerData