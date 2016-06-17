
//With module refactoring using the Module Pattern and little modification
var PoS_app = (function(){
		
		//My Sale class
		var sale = (function(){
			
			//Variables
			var items = [];
			var productsCatalog = [
				new Product('111', 'Milk', 1.99),
				new Product('222', 'Beer', 2.99),
				new Product('333', 'Coke', 3.99),
			];
			var totals = 0;

			//Private Methods---------------------------------------------------
			function Product(sku,name,price){
				this.sku = sku;
				this.name = name;
				this.price = price;
			}

			

			//Public Methods----------------------------------------------------
			function findProductBySku(sku){
				var product = false;
				for (var i = 0; i < productsCatalog.length; i++) {
					if (productsCatalog[i].sku == sku) {
						product = productsCatalog[i];
					}
				}
				return product;
			}

			function addProduct(product){
				items.push(product);
			}

			function getProductName(index){
				return items[index].name;
			}

			function removeProduct(index){
				//Removing the disire elemenet of the array
				items.splice(index,1);
			}

			function updateTotals(){
				totals = 0;
				for (var i = 0; i < items.length; i++) {
					totals += items[i].price;
				}

				return totals.toFixed(2);
			}

			function getCount(){
				return items.length;
			}



			return{
				//Methods
				makeSale:addProduct,
				findBySKU:findProductBySku,
				remove:removeProduct,
				//Getters
				getTotals:updateTotals,
				getItemsCount:getCount,
				getProduct:getProductName
			};


		})();

		//My View class
		var view = (function(){
			//Loading DOM elements
			var elements = {};
			elements.captureButton = document.getElementById('capture');
		    elements.skuInput = document.getElementById('sku');
		    elements.itemsList = document.getElementById('items-list');
		    elements.totals = document.getElementById('totals');

		    //Initial instance and public method of view class
		    function init(){
		    	elements.captureButton.addEventListener('click', function(event){
		    		var product = sale.findBySKU(elements.skuInput.value);
		    		//alert(product.name);
					if (product) {
						// add product to sale model:

						sale.makeSale(product);
						updateItemsListView();

						// update totals in view:
						elements.totals.innerText = sale.getTotals();

					} else {
						alert('Producto no encontrado');
					}
		    	});
		    }
		    //Pirvate methods
		    //Function listener for the remove button
		    function removeListener(index){
				return function(){
					//Removing the product from the sale list by calling the remove method form sale class
					sale.remove(index);
					//updating list
					updateItemsListView();
					//updating totals
					elements.totals.innerText = sale.getTotals();
				};
			}

			//View Updater
		    function updateItemsListView(){

		    	elements.itemsList.innerHTML = '';
		    	//Displaying products on the view
		    	for (var i = (sale.getItemsCount() - 1); i >= 0; i--) {
					var removeButton = document.createElement("BUTTON");
					var text = document.createTextNode("X");
					removeButton.appendChild(text);

					
					var element = document.createElement('h5');
					element.innerHTML = sale.getProduct(i);
					element.appendChild(removeButton);
					
					elements.itemsList.appendChild(element);
					removeButton.addEventListener('click', removeListener(i));

				}
		    }

		    return{
				load:init
			};

		})();

		//The "Main" function of the app to write all the logic of the program
		return{
			main:function(){
				view.load();
			}
		};
})();

PoS_app.main();
