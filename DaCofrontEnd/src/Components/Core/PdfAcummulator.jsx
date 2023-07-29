import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { CurrencyFormat } from "./Locale"

const style = StyleSheet.create({
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
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

})

export default function PdfAcummulator({ objectValuesToAcummulate = {} }) {
    //Convert input Object to an Array
    const arrayValuesToAcummulate = Object.values(objectValuesToAcummulate)

    let totalPrinciple = 0
    let totalPaid = 0
    let totalBalance = 0

    arrayValuesToAcummulate.forEach(element => {
        totalPrinciple += element.accountAnualPrinciple
        totalPaid += element.totalAmountPaid
        totalBalance += element.accountBalance
    });

    return (
        <View style={style.tableRow}>
            <View style={style.tableCol}>
                <Text style={style.tableTdCell}>
                    Total
                </Text>
            </View>
            <View style={style.tableCol}>

            </View>
            <View style={style.tableCol}>
                <Text style={style.tableRightTdCell}>
                    {CurrencyFormat(totalPrinciple)}
                </Text>
            </View>
            <View style={style.tableCol}>
                <Text style={style.tableRightTdCell}>
                    {CurrencyFormat(totalPaid)}
                </Text>
            </View>
            <View style={style.tableCol}>
                <Text style={style.tableRightTdCell}>
                    {CurrencyFormat(totalBalance)}
                </Text>
            </View>
        </View>
    )
} 