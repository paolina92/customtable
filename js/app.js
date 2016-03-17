(function($){

	$(document).ready(function(){
		var customTable = new CustomTable();
		$("#submit-btn").on("click", function(){
			customTable.init();
		});
	});

	var CustomTable = function(){
		var self = this;
		this.init = function(){
			self.getData().then(function(data){
				self.appendCustomTable(data);
			})
			.fail(function(error){
				console.log(error);
			});
		}
		this.getData = function(){
			var url = $("#url").val();
			return $.get(url, function(data) {
			 	return data;
			});
		}
		this.appendCustomTable = function(data){
			var dataFromJson = data;
			var customArray = self.createCustomArray(dataFromJson);
			$.each(customArray, function(k,elem){
				$("tbody").append("<tr><td class=\"col-xs-4 col-md-4\">"+elem.key+"</td><td class=\"col-xs-4 col-md-4\">"+elem.value+"</td><td class=\"col-xs-4 col-md-4\">"+elem.type+"</td></tr>");
			});
			$("table").show();
		}
		this.createCustomArray = function(data){
			var dataToJson = $.parseJSON(data);
			var arr = [];
			$.each(dataToJson, function(key,value){
				var jsonKey = key;
				var type = $.type(value);
				var jsonValue = self.setValues(value,type);
				arr.push({"key":jsonKey,"type":type,"value":jsonValue});
			});
			return arr;
		}
		this.setValues = function(value,type){
			var jsonValue = "";
			switch(type) {
				case "string":
					jsonValue = value.match(/.{1,10}/g)[0];
					break;
				case "object":
					jsonValue = Object.keys(value).length;
					break;
				case "array":
					jsonValue = value.length;
					break;
				default:
					jsonValue = "";
			}
			return jsonValue;
		}
	}



})(jQuery)