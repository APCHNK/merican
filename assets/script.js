const sizes = document.querySelectorAll('.sizes')

sizes.forEach(sizeBlocks => {
    const sizeBlock = sizeBlocks.querySelectorAll('.size')

    sizeBlock.forEach(size => {
        size.addEventListener('click', () =>{
            const info = size.closest('.info');
            clearButtons(sizeBlock);
            size.classList.add('chosen');
            const buttonForm = info.querySelector('form')
            let prodId = buttonForm.querySelector('.tocart')
            prodId.value = size.getAttribute('data-sizevariant')
            let button = buttonForm.querySelector('.addtocart')
            button.classList.remove('not')
            
        })
    })
});

function clearButtons(parent) {
    parent.forEach(size => {
        size.classList = 'size'
    })
}

const addToCarts = document.querySelectorAll('.addtocart')

addToCarts.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const info = button.closest('.info')
        const productId = info.querySelector('.tocart').value
        if (info.querySelector('.chosen')) {
            addProductToCart(productId, info)
        } else {
            let sizes = info.querySelectorAll('.size')
            clearButtons(sizes)
            sizes.forEach(size => {
                size.classList.add('dont')
            })
            button.classList.add('not')
            const message = info.querySelector('.message');
            message.textContent = '*Please select size'
            message.classList = 'message bad'
        }
            
        
    })
})


function addProductToCart(product, info){
    let formData = {
        'items': [{
        'id': product,
        'quantity': 1
        }]
    };
    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json();
    })
    .then(() => {
        const message = info.querySelector('.message');
            message.textContent = 'Great, the item is already in the cart'
            message.classList = 'message good'
      
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}

// CART

let up = document.querySelectorAll('.up')
  let down = document.querySelectorAll('.down')

  up.forEach((item) => {
    item.addEventListener('click', (e) => {
      let product = e.target.closest('.cart-item')
      let input = product.querySelector('.quantity-input');
      let key = product.getAttribute('data-key');
      let value = parseInt(input.value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      input.value = value;
      changeItemTotalPrice(product ,value);
      changeItemQuantity(key, value);
      updateSubtotal()
    })
  })

  down.forEach((item) => {
    item.addEventListener('click', (e) => {
      let product = e.target.closest('.cart-item')
      let input = product.querySelector('.quantity-input');
      let key = product.getAttribute('data-key');
      let value = parseInt(input.value, 10);
      if (value > 0) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
      } 
      if (value == 0) {
        const parent = item.closest('.cart-item')
        parent.style.display = 'none'
      }
      console.log(product)
      changeItemTotalPrice(product ,value);
      changeItemQuantity(key, value);
      updateSubtotal()
    })
  })

  function changeItemTotalPrice(item, quantity) {
    let stroke = item.querySelector('.price').textContent.trim();  
    let totalPrice = strokeToNumber(stroke) * quantity;
    let total = item.querySelector('.total');
    total.innerHTML = `$${totalPrice / 100}.00`

  }
 
  function updateSubtotal() {
    let totals = document.querySelectorAll('.cart-item .total');
    let subtotal = Array.from(totals).map(item => {
      const stroke = item.textContent;
      return strokeToNumber(stroke);
    });
    subtotal = subtotal.reduce((acc, currentValue) => acc + currentValue, 0);
    let subtotalField = document.querySelector('.subtotal-field')
    subtotalField.innerHTML = `$${subtotal / 100}.00`
  }

  function strokeToNumber(stroke) {
      let number = parseFloat(stroke.replace(/[^0-9]/g, ''));
      return number;
  }


  function changeItemQuantity(key, quantity) {
    
    let updates = {};
    updates[key] = quantity; 
    formData = {
      updates,
    }
    console.log(formData)
    fetch(window.Shopify.routes.root + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) 
    })
    .then(response => {
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }








document.addEventListener('DOMContentLoaded', function() {

    if (/iPhone/i.test(navigator.userAgent)) {

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            .productt .description .sizes .size {
                line-height: 100%;
                padding-top: 10px;
                padding-bottom: 5px;
            }
        `;

        document.head.appendChild(style);
    }
});