var dummy = {
  console: function(elementId) {
    return {
      log: function() {
        var msg = "";
        for ( var i = 0; i < arguments.length; i++ ) {
          msg += " " + JSON.stringify(arguments[i]);
        }
        jQuery("#results_"+elementId).append("<li class='LOG'><b>LOG</b> " + msg + "</li>");
      },
    error: function(msg){
        jQuery("#results_"+elementId).append("<li class='ERROR'><b>ERROR</b> " + msg + "</li>");
      }
    }
  }
};

function run(id) {
    try {
      var str = 'var console = dummy.console("'+id+'"); ' + jQuery('#block_'+id).text();
      (new Function('dummy', str ))(dummy);
    } catch(e){
      var d = dummy.console(id);
      d.error(e.message);
    }
}

$(document).ready(function() {
    var i = 1;
    jQuery(".run").each(function(idx, elem) {
      jQuery(elem).attr('id','block_'+i).after('<ol id="results_'+i+'" class="runner"></ol><input type="button" value="Run" class="runner" onclick="run('+i+');">');
      i++;
    });
    prettyPrint();
});
