
(function() {
    angular
        .module("Checkin")
        .controller("checkinController", checkinController)

    function checkinController($routeParams,$location,reservationService) {
        //declare controller
        var model = this;
        model.mode = 'findcheckin';
        model.agreeTerms = false;
        var stripe = Stripe('pk_test_PIwGiLRv0zSDSKCTIv7Hv2ZT');
        var card = "";
        //declare function
        model.getReservationByNo = getReservationByNo;
        model.checkIn = checkIn;
        // model.deleteWebsite = deleteWebsite;

        //initial function
        function init() {
            
        }
        init();

        //functions
        function getReservationByNo(){
            reservationService.getReservationByNo(model.resvNo)
                .then(function (response) {
                    model.resv = response.data;

                    if (model.resv.status == "BOOKED") {
                        model.formatcheckindate = new Date(model.resv.checkindate);
                        model.formatcheckoutdate = new Date(model.resv.checkoutdate);
                        model.resvId = model.resv._id;
                        model.mode = 'checkin';
                        createCardForm();
                    }
                    else if(model.resv.status == "CHECKEDIN"){
                        model.errorMessage = "This Reservation Has Already Been Checked In";
                    }
                    else{
                        model.errorMessage = "This Reservation Has Been Canceled";
                    }

                });
        }

        function createCardForm() {
            angular.element(document).ready(function () {
                var elements = stripe.elements();
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
                card = elements.create('card', {style: style});
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
            });



        }
        function checkIn() {
            if(model.agreeTerms) {
                stripe.createToken(card).then(function (result) {
                    if (result.error) {
                        // Inform the user if there was an error
                        var errorElement = document.getElementById('card-errors');
                        errorElement.textContent = result.error.message;
                    } else {
                        // Send the token to your server

                        stripeTokenHandler(result.token);
                    }
                });
            }
            else{
                model.errorMessage = "Please agree terms;"
            }

        }


        function stripeTokenHandler(token) {
            // Insert the token ID into the form so it gets submitted to the server
            model.resv.stripetoken = token.id;
           reservationService
               .checkIn(model.resv)
               .then(function (response) {
                  if(response.data == "1"){
                      var url = "thankyou";
                      $location.url(url);
                  }
                  else {
                      alert(response.data);
                  }
               });

        }




    }

})();