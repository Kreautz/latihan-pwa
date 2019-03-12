$(document).ready(function () {
    // var _url = 'http://localhost:8009/php/index.php';

    var _url = 'https://my-json-server.typicode.com/kreautz/latihan-pwa-api/mahasiswa';

    var result = '';

    var gender_opt = '';

    var gender  = [];

    //$.get(_url,function (data) {
    function renderPage(data) {
        $.each (data,function (key, items) {

            gend = items.gender;

            result += '<div>'+'<p><b>'+items.name+'</b></p>'+
            '<p>'+gend+'</p>'+'</div>';
            
            //jika data gender tidak ada dalam data array
            if($.inArray(gend,gender)=== -1){
                //data gender di push
                gender.push(gend);
                //setgender_opt dengan option
                gender_opt += '<option value="'+gend+'">'+gend+'</option>'
            }

        });

        $('#mhs-list').html(result);


        $('#gender-select').html('<option value = "semua">semua</option>'+gender_opt);


        };

        
        var networkDataRecieve = false;

        var networkUpdate = fetch(_url).then(function(response){
            return response.json();
        }).then(function(data) {
            networkDataRecieve = true;
            renderPage(data)
        });

        caches.match(_url).then(function(response) {
            if(!response) throw Error("no data on Cache");
            return response.json();
        }).then(function(data) {
            if (!networkDataRecieve){
                renderPage(data);
                console.log("render data from cache");
            }
        }).catch(function(){
            networkUpdate;
        })


        $('#gender-select').on('change', function(){
            updateList($(this).val());
        });

        


        //FUNCTION
        function updateList(opt){
            var _url2 = _url;

            var result = '';

            if(opt !== 'semua'){
                _url2 = _url + '?gender=' + opt;
            }


        $.get(_url2,function (data) {
            $.each (data,function (key, items) {

                gend = items.gender;

                result += '<div>'+'<p><b>'+items.name+'</b></p>'+
                '<p>'+gend+'</p>'+'</div>';
            
            //jika data gender tidak ada dalam data array
                if($.inArray(gend,gender)=== -1){
                //data gender di push
                    gender.push(gend);
                //setgender_opt dengan option
                    gender_opt += '<option value="'+gend+'">'+gend+'</option>'
            }

        });

        $('#mhs-list').html(result);

        });
        }
    });

        
        
        //Serviceworker
        if ('serviceWorker' in navigator){
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(reg){
                    console.log('SW regis sukses dengan skop', reg.scope);
                }, function(err){
                    console.log('SW regis failed', err);
                });
            });
        }


        