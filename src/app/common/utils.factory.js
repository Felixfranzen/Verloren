angular.module("verloren.utils", [])

.factory("utils", utils);
function utils(){

	return {
		formatFileSize: formatFileSize,
		rainbow: rainbow
	};


	function formatFileSize(bytes){
		var k = 1000,
		sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i))).toFixed(1) + ' ' + sizes[i];
	}

	function rainbow(index){
		var colors = ["green", "green", "greentwo", "light-blue", "dark-blue", "purpleone", "purpletwo", "purplethree"];
		return colors[index % colors.length];
	}

}