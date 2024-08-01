document.addEventListener('DOMContentLoaded', () => {
    
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        const productsDiv = document.getElementById('products');
        if (productsDiv) {
          products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
              <h3>${product.name}</h3>
              <p>Price: $${product.price}</p>
              <p>Stock: ${product.stock}</p>
              <button onclick="addToCart('${product._id}')">Add to Cart</button>
            `;
            productsDiv.appendChild(productDiv);
          });
        }
      });
  
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Login successful');
            window.location.href = 'index.html';
          } else {
            alert('Login failed');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    }
  
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Registration successful');
            window.location.href = 'login.html';
          } else {
            alert('Registration failed');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    }
  
    
    const cartItemsDiv = document.getElementById('cartItems');
    if (cartItemsDiv) {
      fetch('/api/carts')
        .then(response => response.json())
        .then(cart => {
          cart.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
              <h3>${item.product.name}</h3>
              <p>Price: $${item.product.price}</p>
              <p>Quantity: ${item.quantity}</p>
            `;
            cartItemsDiv.appendChild(itemDiv);
          });
        });
    }
  });
  
  function addToCart(productId) {
    fetch('/api/carts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
      alert('Product added to cart');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  function purchaseCart() {
    fetch('/api/carts/purchase', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Purchase successful');
        window.location.href = 'index.html';
      } else {
        alert('Purchase failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  