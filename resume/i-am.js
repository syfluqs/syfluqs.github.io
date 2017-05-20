
    var current_state;
    var item_array = {};
    var item_array_size = 0;
    var arr_count = 0;
    var count = 0;
    var blink_countdown = 20;

    function animate_i_am_content() {
        /* i-am-content animation */
        // $("#i-am-content").html(""+arr_count+"-"+count);
        switch (current_state) {
            case 0:
                // console.log("animating state 0");
                if (count<item_array[arr_count].length) {
                    $("#i-am-content").html($("#i-am-content").text()+item_array[arr_count][count]+"<div id=\"i-am-cursor\"></div>");
                    if (count%8 < 4)  {
                        $("#i-am-cursor").css("background", "rgba(255,255,255,0.35)");
                    } else {
                        $("#i-am-cursor").css("background", "rgba(255,255,255,0.0)");
                    }
                    count++;
                } else {
                    count = 0;
                    current_state = 1;
                    arr_count++;
                }
                break;

            case 1:
                /* blink the cursor */
                // console.log("animating state 1 ");
                if (count<=blink_countdown) {
                    if (count%8 < 4)  {
                        $("#i-am-cursor").css("background", "rgba(255,255,255,0.35)");
                    } else {
                        $("#i-am-cursor").css("background", "rgba(255,255,255,0.0)");
                    }
                    count++;
                } else {
                    count = 0;
                    if (arr_count>=item_array_size) {
                        arr_count = 0;
                    }
                    current_state = 0;
                    $("#i-am-content").html("<div id=\"i-am-cursor\"></div>");
                    break;
                }
                break;
        }
        var t = setTimeout(animate_i_am_content, 100);
        return;
    }

    function init_item_array() {
        /* pick items from #i-am-item and fill an array */
        var a = "";
        while ((a=$("#i-am-items").find("div").eq(item_array_size).text())!="") {
            item_array[item_array_size++] = a;
        }
    }

    $(document).ready( function () {
        current_state = 0;
        init_item_array();
        animate_i_am_content();
    });