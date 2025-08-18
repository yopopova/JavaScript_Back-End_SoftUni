const { paymentMethodsMap } = require('../constants-2');

exports.getPaymentMethodViewData = (selectedPaymnetMethod) => {
    const paymentMethods = Object.keys(paymentMethodsMap).map(key => ({
        value: key,
        label: paymentMethodsMap[key],
        isSelected: selectedPaymnetMethod == key
    }));

    return paymentMethods;
}