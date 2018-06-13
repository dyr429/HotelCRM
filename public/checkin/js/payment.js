// Create a Stripe client
var stripe = Stripe('pk_test_PIwGiLRv0zSDSKCTIv7Hv2ZT');

// Create an instance of Elements
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
    base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
};

// Create an instance of the card Element
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Handle form submission
var form = document.getElementById('payment-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    stripe.createToken(card).then(function(result) {
        if (result.error) {
            // Inform the user if there was an error
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            // Send the token to your server

            stripeTokenHandler(result.token);
        }
    });
});

function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    var resvno = document.getElementById('resvno');
    var guestno =  document.getElementById('guestno');

    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
    //
    var hiddenFirstname = document.createElement('input');
    hiddenFirstname.setAttribute('type', 'hidden');
    hiddenFirstname.setAttribute('name', 'firstname');
    hiddenFirstname.setAttribute('value', firstname.value);
    form.appendChild(hiddenFirstname);
    //
    var hiddenLastname = document.createElement('input');
    hiddenLastname.setAttribute('type', 'hidden');
    hiddenLastname.setAttribute('name', 'lastname');
    hiddenLastname.setAttribute('value', lastname.value);
    form.appendChild(hiddenLastname);
    //
    var hiddenPhone = document.createElement('input');
    hiddenPhone.setAttribute('type', 'hidden');
    hiddenPhone.setAttribute('name', 'phone');
    hiddenPhone.setAttribute('value', phone.value);
    form.appendChild(hiddenPhone);
    //

    var hiddenEmail = document.createElement('input');
    hiddenEmail.setAttribute('type', 'hidden');
    hiddenEmail.setAttribute('name', 'email');
    hiddenEmail.setAttribute('value', email.value);
    form.appendChild(hiddenEmail);
    //
    var hiddenGuestno = document.createElement('input');
    hiddenGuestno.setAttribute('type', 'hidden');
    hiddenGuestno.setAttribute('name', 'guestno');
    hiddenGuestno.setAttribute('value', guestno.value);
    form.appendChild(hiddenGuestno);
    //
    var hiddenResvno = document.createElement('input');
    hiddenResvno.setAttribute('type', 'hidden');
    hiddenResvno.setAttribute('name', 'resvno');
    hiddenResvno.setAttribute('value', resvno.value);
    form.appendChild(hiddenResvno);

    alert(resvno.value);
    // Submit the form
    form.submit();
}