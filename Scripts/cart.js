export let cart = JSON.parse(localStorage.getItem('cart')) || []
// [
//   { productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//     quantity : 2,
//     deliveryOptionId : '1'
// },{
//     productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//     quantity : 1,
//     deliveryOptionId : '2'
// }];

// sixth step, we store our cart to loacl storage
function saveToStorage(){localStorage.setItem('cart', JSON.stringify(cart))};

// third step, we check if product is already add in cart then increase its quantity else, add it to cart.
export function addToCart (productId, selectorValue){
  //code for matching items
  let matchingItems;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){matchingItems = cartItem}});
    if(matchingItems){
      // matchingItems.quantity++
      matchingItems.quantity += selectorValue }
    else{
      cart.push({productId,
      quantity : selectorValue,
      deliveryOptionId : '1'})};

      saveToStorage();
};

export function cartQuantity(){
    //code or cart logo interactivation
    let cartQuantity = 0;
    cart.forEach((item) => {cartQuantity += item.quantity})
    return cartQuantity;
  };

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){newCart.push(cartItem)}
    cart = newCart;
    saveToStorage();
  })};


export function updateDeliveryDate(productId, deliveryOptionId){
  let matchingItems;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){matchingItems = cartItem}});
  matchingItems.deliveryOptionId = deliveryOptionId;
  saveToStorage();
};

export function updateCartQuantity(productId, newQuantity){
  if(!newQuantity || newQuantity < 0){return}
  let matchingItems;

  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){matchingItems = cartItem}
  })

  matchingItems.quantity = newQuantity

  saveToStorage();
}