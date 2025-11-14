import {cart, removeFromCart, cartQuantity, updateDeliveryDate, updateCartQuantity} from './cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from '../data/Delivery option.js';
import { paymentTotal } from './order summary.js';

// fourth step, we make checkout cart button interactive. we took product id from cart and fetch all details from products and display on the web page.
function renderCartSummary(){
    paymentTotal();
    let cartSummaryHTML = '';

    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;
        
        let matchingProduct;

        products.forEach((product)=> {
            if(product.id === productId){
                matchingProduct= product
            };
        });
        //seventh step part 2
        const deliveryOptionId = cartItem.deliveryOptionId;
        
        let deliveryOption;
        
        deliveryOptions.forEach((option) => {
            if(option.id === deliveryOptionId){deliveryOption = option}
        });
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        
        cartSummaryHTML += 
        `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>
            
            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">
                
                <div class="cart-item-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-quantity" data-product-id = "${matchingProduct.id}">
                        Update
                        </span>
                        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                        <span class="save-quantity-link link-primary js-save-button" data-product-id ="${matchingProduct.id}">
                        Save
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-button" data-product-id = "${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                </div>
                    
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                            ${deliveryOptionHTMl(matchingProduct, cartItem)}
                            </div>
                            </div>
                            </div>
                            </div>`
            });
            
            document.querySelector('.js-ordersummary-HTML').innerHTML = cartSummaryHTML;
            document.querySelector('.js-checkout-quantity').innerHTML = `${cartQuantity()} Items`;

            // seventh step, we make deliverydate interactive first we import date from webpage and ...
            function deliveryOptionHTMl (matchingProduct, cartItem){
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0 
            ? 'FREE '                                           // tournery operator
            : `$${formatCurrency(deliveryOption.priceCents)}-`
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId

            html += ` 
                <div class="delivery-option js-delivery-option"
                        data-product-id = ${matchingProduct.id}
                        data-delivery-option-id = ${deliveryOption.id}>
                    <input type="radio" ${isChecked ? 'checked' :''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString}Shipping
                        </div>
                    </div>
                    </div>`
        });

        return html;
    };

    //fifth step, we make delete button interactive.
    document.querySelectorAll('.js-delete-button').forEach((deleteButton)=> {
        deleteButton.addEventListener('click', ()=> {
            const productId = deleteButton.dataset.productId
            removeFromCart(productId)
            const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`)
        itemContainer.remove()
        paymentTotal();
        renderCartSummary();
        });

    });


    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset
            updateDeliveryDate(productId, deliveryOptionId);
            renderCartSummary();
        });
    });

    document.querySelectorAll('.js-update-quantity').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
            container.classList.add('update-button-vansih')
        })
    })

    document.querySelectorAll('.js-save-button').forEach((button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove('is-editing-quantity');
            // container.classList.remove('update-button-vansih')

            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(quantityInput.value);
            updateCartQuantity(productId, newQuantity)
            renderCartSummary();

        })
    }))
};
renderCartSummary();