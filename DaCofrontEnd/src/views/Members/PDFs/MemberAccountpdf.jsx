import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { CurrencyFormat, DateFormat } from '../../../Components/Core/Locale'

const style = StyleSheet.create({
    body: {
        padding: 25,
        paddingBottom: 65,
        paddingHorizontal: 15
    },

    header: {
        marginBottom: 18,
        textAlign: 'center'
    },

    title: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'extrabold',
        textAlign: 'center',
        textDecoration: 'underline',
        textTransform: 'capitalize'
    },

    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },

    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderTop: 1,
        borderColor: 'gray',
        borderRightWidth: 0,
        borderBottomWidth: 0
    },

    tableRow: {
        margin: "auto",
        width: "100%",
        flexDirection: "row",
        fontWeight: 900
    },

    tableCol: {
        width: '25%',
        alignContent: 'space-between',
        borderStyle: "solid",
        borderBottom: 1,
        borderColor: 'gray',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: 'left'
    },

    tableThCell: {
        fontSize: 12,
        fontWeight: 'extrabold',
        marginLeft: 4,
        marginTop: 4
    },

    tableRightThCell: {
        fontSize: 12,
        fontWeight: 'extrabold',
        textAlign: 'right',
        marginRight: 4,
        marginTop: 4
    },

    tableTdCell: {
        fontSize: 10,
        marginLeft: 4,
        marginTop: 4
    },

    tableRightTdCell: {
        fontSize: 10,
        textAlign: 'right',
        marginRight: 4,
        marginTop: 4
    },

    empytTd: {
        color: 'Red',
        textAlign: 'center'
    },

    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'gray'
    }
})

const MemberAccountpdf = ({ memberAccountPdf, member, account, accountYear }) => {
    return (
        <Document>
            <Page style={style.body}>
                <Text style={style.header} fixed>
                    <Text style={style.title}>
                        {member + '\'s ' + account + ' for Financial Year ' + accountYear}
                    </Text>
                </Text>
                <View style={style.table}>
                    <View>
                        <View style={style.tableRow}>
                            <View style={style.tableCol}><Text style={style.tableThCell}>Value-Date</Text></View>
                            <View style={style.tableCol}><Text style={style.tableThCell}>Folio</Text></View>
                            <View style={style.tableCol}><Text style={style.tableRightThCell}>Dr</Text></View>
                            <View style={style.tableCol}><Text style={style.tableRightThCell}>Cr</Text></View>
                        </View>
                    </View>
                    <View>
                        {(memberAccountPdf ?
                            memberAccountPdf.map(memberAccount => (
                                <View style={style.tableRow} key={memberAccount.txnId}>
                                    <View style={style.tableCol}><Text style={style.tableTdCell}>{DateFormat(memberAccount.txnDate)}</Text></View>
                                    <View style={style.tableCol}><Text style={style.tableTdCell}>{memberAccount.Folio}</Text></View>
                                    {memberAccount.event == 1 &&
                                        <>
                                            <View style={style.tableCol}><Text style={style.tableRightTdCell}>{CurrencyFormat(0)}</Text></View>
                                            <View style={style.tableCol}><Text style={style.tableRightTdCell}>{CurrencyFormat(memberAccount.Amount)}</Text></View>
                                        </>
                                    }
                                    {memberAccount.event == 2 &&
                                        <>
                                            <View style={style.tableCol}><Text style={style.tableRightTdCell}>{CurrencyFormat(memberAccount.Amount)}</Text></View>
                                            <View style={style.tableCol}><Text style={style.tableRightTdCell}>{CurrencyFormat(0)}</Text></View>
                                        </>
                                    }

                                </View>
                            )) :
                            <View>
                                <View colspan="4" style={style.empytTd}>
                                    No record in the database!!!
                                </View>
                            </View>
                        )}
                    </View>
                </View>
                <Text
                    style={style.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
                    fixed
                />
            </Page>
        </Document>

    )
}

export default MemberAccountpdf