function sortBubble(data) {
    var tmp; 
    for (var i = data.length - 1; i > 0; i--) {  
        var counter=0;
        for (var j = 0; j < i; j++) {
            if (data[j] > data[j+1]) {
                tmp = data[j];
                data[j] = data[j+1];
                data[j+1] = tmp;
                counter++;
            }
        }  
        if(counter==0){
          break;
        } 
    }
  return data;
 };