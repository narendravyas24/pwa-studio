import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './quantity.css';

// added by narendra
import { Text } from 'informed';
import Icon from 'src/components/Icon';
import WifiIcon from 'react-feather/dist/icons/wifi';
import { useToasts } from '@magento/peregrine';

const Quantity = props => {
    const { classes, ...restProps } = props;
    const [{ toasts }, { addToast }] = useToasts();
    const OnlineIcon = <Icon src={WifiIcon} attrs={{ width: 18 }} />;

    console.log(toasts);
    const showToast = toastMessage => {
        if (toastMessage) {
            addToast({
                type: 'error',
                icon: OnlineIcon,
                message: toastMessage,
                timeout: 5000,
                onDismiss: remove => {
                    remove();
                }
            });
        }
    };

    const validateQuantity = value => {
        var validateRegex = /^[1-9]\d*(\.\d+)?$/;
        const finalVal =
            value <= 0
                ? 'Please enter a quantity greater than 0.'
                : value == undefined || !validateRegex.test(value)
                ? 'Please enter a valid number in this field.'
                : undefined;
        if (finalVal) {
            showToast(finalVal);
        }
        return finalVal;
    };
    return (
        <div className={classes.root}>
            <label htmlFor="quantity">
                <Text
                    {...restProps}
                    id="quantity"
                    type="number"
                    field="quantity"
                    validateOnChange
                    validate={validateQuantity}
                    className={classes.quantityField}
                />
            </label>
        </div>
    );
};

Quantity.propTypes = {
    classes: shape({
        root: string,
        quantityField: string
    }),
    items: arrayOf(
        shape({
            value: number
        })
    )
};

export default classify(defaultClasses)(Quantity);
