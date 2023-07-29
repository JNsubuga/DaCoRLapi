import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { CurrencyFormat, DateFormat } from '../../../Components/Core/Locale'
import PdfAcummulator from '../../../Components/Core/PdfAcummulator'

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
        width: '20%',
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

const Accountpdf = ({ membersPdf, account }) => {
    return (
        <Document>
            <Page style={style.body}>
                <Text style={style.header} fixed>
                    <Text style={style.title}>
                        {account + '\'s Members'}
                    </Text>
                </Text>
                <View style={style.table}>
                    <View>
                        <View style={style.tableRow}>
                            <View style={style.tableCol}><Text style={style.tableThCell}>Member</Text></View>
                            <View style={style.tableCol}><Text style={style.tableThCell}>Folio</Text></View>
                            <View style={style.tableCol}><Text style={style.tableRightThCell}>Anual Principle</Text></View>
                            <View style={style.tableCol}><Text style={style.tableRightThCell}>Amount Paid</Text></View>
                            <View style={style.tableCol}><Text style={style.tableRightThCell}>Balance</Text></View>
                        </View>
                    </View>
                    {membersPdf ?
                        membersPdf.map(member => (
                            <View style={style.tableRow} key={member.memberId}>
                                <View style={style.tableCol}><Text style={style.tableTdCell}>{member.member}</Text></View>
                                <View style={style.tableCol}><Text style={style.tableTdCell}>{member.Folio}</Text></View>
                                <View style={style.tableCol}><Text style={style.tableRightTdCell}>{CurrencyFormat(member.accountAnualPrinciple)}</Text></View>
                                <View style={style.tableCol}><Text style={style.tableRightTdCell}>{CurrencyFormat(member.totalAmountPaid)}</Text></View>
                                <View style={style.tableCol}><Text style={style.tableRightTdCell}>{CurrencyFormat(member.accountBalance)}</Text></View>
                            </View>
                        )) :
                        <View>
                            <View colspan="5" style={style.empytTd}>
                                No record in the database!!!
                            </View>
                        </View>
                    }
                    <PdfAcummulator objectValuesToAcummulate={membersPdf} />
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

export default Accountpdf