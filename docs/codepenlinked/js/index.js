jQuery(function(){

jQuery('#close').click(function(){
  jQuery('.sidebar').hide();
        });

jQuery('#open').click(function(){
  jQuery('.sidebar').show();
        });

jQuery('#showall').click(function(){
  jQuery('.targetDiv').show();
        });
jQuery('#hideall').click(function(){
  jQuery('.targetDiv').hide();
        });

jQuery('.showSingle').click(function(){
  jQuery('.targetDiv').hide();
  jQuery('#div'+$(this).attr('target')).show();
        });
});
