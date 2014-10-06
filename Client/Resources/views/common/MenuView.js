var createTableViewRow = function(rowData){
	
	if(rowData.isHeader){
		var row = Ti.UI.createTableViewRow({
			height:44,
			navView: rowData.view,
			backgroundColor:'transparent',
			backgroundImage:'/images/row_bg.png',
			backgroundGradient : {
				type : "linear",
				startPoint : {
					x : "0%",
					y : "0%"
				},
				endPoint : {
					x : "0%",
					y : "100%"
				},
				colors : [{
					color : "#EEE",
					offset : 0.0
				}, {
					color : "#CCC",
					offset : 1.0
				}]
			}
		});
	} else {
		var row = Ti.UI.createTableViewRow({
			height:44,
			navView: rowData.view,
			backgroundColor:'transparent',
			backgroundImage:'/images/row_bg.png',
		});
	}
	
	if(rowData.hasImage){
		var image = Ti.UI.createImageView({
			left:8,
			width:28,
			height:28,
			image:rowData.image
		});
		row.add(image);
		var titleLeft = 40;
	} else {
		var titleLeft = 8;
	}
	
	
	var title = Ti.UI.createLabel({
		color:'#666666',
		left:titleLeft,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		text:rowData.title,
		font:{
			fontFamily:'Arial-BoldMT',
			fontWeight:'bold',
			fontSize:19
		}
	});
	row.add(title);
	
	return row;
};

var MenuView = function(args){
	var self = Ti.UI.createTableView({
		backgroundColor:'white',
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
	});

	var rows = [];

	for(i=0; i<args.rowData.length; i++) {
		rows.push(createTableViewRow(args.rowData[i]));
	}

	self.setData(rows);

	return self;
};

module.exports = MenuView;