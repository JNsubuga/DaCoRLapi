import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { CurrencyFormat } from '../../../Components/Core/Locale'

const style = StyleSheet.create({
    body: {
        padding: 25,
        paddingBottom: 65,
        paddingHorizontal: 15
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey'
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderTop: 1,
        borderColor: 'gray',
        borderRightWidth: 0,
        borderBottomWidth: 0
    },

    tableRow: {
        margin: "auto",
        width: "100%",
        flexDirection: "row"
    },

    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderBottom: 1,
        borderColor: 'gray',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: 'left'
    },

    tableThCell: {
        fontSize: 12,
        fontWeight: 900,
        marginLeft: 4,
        marginTop: 4
    },

    tableRightThCell: {
        fontSize: 12,
        fontWeight: 900,
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

const Accountspdf = ({ accountsPdf }) => {
    return (
        < Document >
            <Page style={style.body}>
                <Text style={style.header} fixed>

                </Text>
                <View style={style.table}>
                    <View>
                        <View style={style.tableRow}>
                            <View style={style.tableCol}><Text style={style.tableThCell}>Account</Text></View>
                            <View style={style.tableCol}><Text style={style.tableRightThCell}>Year of account Opening</Text></View>
                            <View style={style.tableCol}><Text style={style.tableThCell}>Code</Text></View>
                            <View style={style.tableCol}><Text style={style.tableRightThCell}>Principle</Text></View>
                        </View>
                    </View>
                    <View>
                        {(accountsPdf ?
                            accountsPdf.map(account => (
                                <View style={style.tableRow} key={account.id}>
                                    <View style={style.tableCol}><Text style={style.tableTdCell}>{account.Name}</Text></View>
                                    <View style={style.tableCol}><Text style={style.tableRightTdCell}>{account.year}</Text></View>
                                    <View style={style.tableCol}><Text style={style.tableTdCell}>{account.Code}</Text></View>
                                    <View style={style.tableCol}><Text style={style.tableRightTdCell}>{CurrencyFormat(account.AnualPrinciple)}</Text></View>
                                </View>
                            )) :
                            <View>
                                <View colspan="5" style={style.empytTd}>
                                    <Text>No record in the database!!!</Text>
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
        </Document >
    )
}

export default Accountspdf;
