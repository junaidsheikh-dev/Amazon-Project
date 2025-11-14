import { cart, cartQuantity } from "./cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/Delivery option.js";
import { formatCurrency } from "../utils/money.js";

// eighth step we make order summary price interactive.
export function paymentTotal(){
    let paymentTotalHTML = '';
    let productPriceCents = 0;
    let productShippingCost = 0;
    let totalBeforeTax = 0;
    let estimatedTax = 0;
    let orderTotalCents = 0;

    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;
        let matchingProduct;
        products.forEach((product)=> {if(product.id === productId){matchingProduct = product}});
        productPriceCents += matchingProduct.priceCents * cartItem.quantity

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;
        deliveryOptions.forEach((option) => 
            {if(option.id === deliveryOptionId){deliveryOption = option}});
        productShippingCost += deliveryOption.priceCents

        totalBeforeTax = productPriceCents + productShippingCost;
        estimatedTax = totalBeforeTax * 0.1
        orderTotalCents = totalBeforeTax + estimatedTax

        paymentTotalHTML = `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${cartQuantity()}):</div>
                <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatCurrency(productShippingCost)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatCurrency(orderTotalCents)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>`
    });
   document.querySelector('.js-payment-summary').innerHTML = paymentTotalHTML;
};