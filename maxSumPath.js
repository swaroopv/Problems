/*
*	challenge link: http://www.codewars.com/kata/maximum-sum-path/javascript
*	
*Maximum Sum Path
*
*Given a 2 dimensional array of numbers, start at the top left and moving only right or down finds the path crossing numbers with the *greatest total sum. Return a path string of '→' and '↓' characters representing the moves made from top left to bottom right and a sum *representing the total sum	
*
*Example:
*
*[ [12,  4, 38],
*  [ 2, 10,  4],
*  [10, 48, 10] ]
*Solution:
*
*[ [ →,  ↓, 38],
*  [ 2,  ↓,  4],
*  [10,  →, 10] ]
*would return
*
*{ 'path': '→↓↓→',
*  'sum': 84 } //12+4+10+48+10
*/

function maxSumPath(a) {
	//Have used dynamic programming approach
	var result = { 'path' : '' , 'sum' : 0 };
	if(a.length == 0)
		return result;
	//opt is required for memoization, i.e storing intermediate max paths for each location
	var opt = new Array(a.length);
	for (var i = 0; i < a.length; i++) {
		opt[i] = new Array(a[0].length);
	}
	result.sum = maxSum(a,opt,0,0);
	result.path = findMaxPath(opt);
	return result;
}

function findMaxPath(opt){
	var x = 0, y = 0;
	var result = "";
	var xlimit = opt.length - 1;
	var ylimit = opt[0].length - 1;
	
	while( x != xlimit || y != ylimit){
		if(x + 1 > xlimit){
			result += "→" ;
			++y;
		}else if(y + 1 > ylimit){
			result += "↓" ;
			++x;
		}else if(opt[x+1][y] < opt[x][y+1]){
		  result += "→" ;					  
			++y;      
		}else{
		  result += "↓" ;
			++x;       
		}
	}
	return result;
}

function maxSum(a,opt, x, y){
	if((x == a.length-1) && (y == a[0].length-1))
		return opt[x][y] = a[x][y];

	if(opt[x][y] == null){
		var right = 0 , down = 0;
		if(x + 1 < a.length)
			right = maxSum(a, opt, x+1, y);	
		if(y + 1 < a[0].length)
			down = maxSum(a, opt, x, y+1);

		opt[x][y] = Math.max(right,down) + a[x][y];
	}  
	return opt[x][y];
}