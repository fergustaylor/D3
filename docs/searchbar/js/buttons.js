function button() {
//make the buttons work
  $(document).ready(function() {
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
};
