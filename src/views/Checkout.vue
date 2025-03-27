<template>
  <div class="checkout">
    <h1>Pay with PayPal</h1>
    <div id="paypal-button-container"></div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPage',
  mounted() {
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AWN-D9kLKdHwIRYhLVxweqXDSgeEBZiBS7OOPC5bmgG5CZ10YLiR4unphrTKZCitY5K8YEHPc_2n1WYw&currency=USD';
      script.onload = this.renderPayPalButton;
      document.body.appendChild(script);
    } else {
      this.renderPayPalButton();
    }
  },
  methods: {
    renderPayPalButton() {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '20.00'
              }
            }]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert('Payment completed by ' + details.payer.name.given_name);
          });
        }
      }).render('#paypal-button-container');
    }
  }
};
</script>

<style scoped>
.checkout {
  max-width: 600px;
  margin: auto;
  padding: 40px;
  text-align: center;
}
</style>
