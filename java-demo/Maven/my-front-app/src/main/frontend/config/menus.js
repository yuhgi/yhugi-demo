module.exports = [
    {
        name:'report', // 报表
        bundle:true,
        subMenus:[
            {
                name:'biCashBasisReport', // 收付实现制台帐
                bundle:true // 是否打包
            },{
                name:'biCashRegisterDetailReport', // 收银入账明细报表
                bundle:true
            },{
                name:'biConsumptionProReport', // 消费项目明细日报
                bundle:false
            },{
                name:'biGroupCheckoutReport', // 企业租房结账日报
                bundle:false
            },{
                name:'biManagementReport', // 管理层日报
                bundle:false
            },{
                name:'biRoomChargeDailyReport', //夜核房费日报
                bundle:false
            },{
                name:'biStoreCheckinDailyReport', // 门店在住客户日报
                bundle:false
            },{
                name:'biStoreOperationDailyReport', // 门店运营日报表
                bundle:false
            },{
                name:'CheckoutCustomerDayReport', // 门店退房客户日报
                bundle:false
            },{
                name:'checkoutcustomerReport', // 门店退房汇总日报
                bundle:false
            }
        ]
    }
];