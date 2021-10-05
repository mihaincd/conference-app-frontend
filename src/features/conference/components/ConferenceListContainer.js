import React, { useCallback, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import ConferenceFilter from './ConferenceFilter';
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text';
import ConferenceList from './ConferenceList';
import { extractPager, generateDefaultFilters } from 'utils/functions';
import { useQueryWithErrorHandling } from 'hooks/errorHandling';
import { CONFERENCE_LIST_QUERY } from './gql/queries/ConferenceListQuery';
import { useEmail } from 'hooks/useEmail';
import { useFooter } from 'providers/AreasProvider';
import Pagination from '@bit/totalsoft_oss.react-mui.pagination';
import { useMutation } from '@apollo/client';
import ATTEND_CONFERENCE from './gql/mutations/AttendConference';
import WITHDRAW_CONFERENCE from './gql/mutations/WithdrawConference';
import { useError } from 'hooks/errorHandling';
import DialogDisplay from '@bit/totalsoft_oss.react-mui.dialog-display'
import ConferenceCodeModal from './ConferenceCodeModal';
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core';
import { useTranslation } from 'react-i18next';
import { emptyArray, emptyString } from 'utils/constants';



function ConferenceListContainer() {
    const [filters, setFilters] = useState(generateDefaultFilters)
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
    const { t } = useTranslation()

    const showError = useError()
    const [code, setCode] = useState()
    const [open, setOpen] = useState(false)
    const [suggestedConferences, setSuggestedConferences] = useState(emptyArray)

    const addToast = useToast()


    const [email] = useEmail()
    const [, setFooter] = useFooter()
    useEffect(() => () => setFooter(null), [])    // eslint-disable-line react-hooks/exhaustive-deps

    const [attend] = useMutation(ATTEND_CONFERENCE, {
        onError: showError,
        onCompleted: result => {

            if (result?.attend) {
                setCode(result?.attend?.code)
                setSuggestedConferences(result?.attend?.suggestedConferences)
                setOpen(true)
                addToast(t("Conferences.SuccessfullyAttended"), 'success')

            }
        }
    })
    
    const [withdraw] = useMutation(WITHDRAW_CONFERENCE, {
        onError: showError,
        onCompleted: result => {
            if (result?.withdraw) {
                addToast(t("Conferences.SuccessfullyWithdraw"), 'success')
                refetch()
            }
        }
    })

    const handleAttend = useCallback(conferenceId => () => {
        attend({
            variables: {
                input: {
                    conferenceId,
                    attendeeEmail: email
                }
            }
        })
    }, [attend, email])

    //TODO

    const handleWithdrawn = useCallback(conferenceId => () => {
        withdraw({
            variables: {
                input: {
                    conferenceId,
                    attendeeEmail: email
                }
            }
        })
    }, [withdraw, email])

    const handleRowsPerPageChange = useCallback((pageSize) => {
        setPager((state) => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])
    const handlePageChange = useCallback((page) => {
        setPager((state) => ({ ...state, page }))
    }, [])

    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: extractPager(pager),
            filters,
            email
        },
        onCompleted: (result) => {
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state => ({ ...state, totalCount }))
        }
    })

    useEffect(() => {
        setFooter(<Pagination
            totalCount={pager.totalCount}
            page={pager.page}
            pageSize={pager.pageSize}
            rowsPerPageOptions={[3, 6, 12, 24, 100]}
            onRowsPerPageChange={handleRowsPerPageChange}
            onPageChange={handlePageChange}
            onRefresh={refetch}

        />)
    }, [handlePageChange, handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])

    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
        setCode(emptyString)
        refetch()
    }, [refetch])

    if (loading || !data) return <LoadingFakeText lines={10} />

    return (<>
        <Grid container>
            <Grid item xs={12}>
                <ConferenceFilter filters={filters} onApplyFilters={handleApplyFilters}></ConferenceFilter>
            </Grid>
            <Grid>
                <ConferenceList conferences={data?.conferenceList?.values} onWithdrawn={handleWithdrawn} onAttend={handleAttend} />
                <DialogDisplay id='showQRCode'
                    open={open}
                    onClose={handleClose}
                    content={
                        <ConferenceCodeModal
                            code={code}
                            suggestedConferences={suggestedConferences}
                            onAttend={handleAttend}
                            onWithdrawn={handleWithdrawn}
                        />}
                />
            </Grid>
        </Grid>
    </>
    )
}

export default ConferenceListContainer
