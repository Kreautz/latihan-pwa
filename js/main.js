$(document).ready(function() {
    // API
    var _url = 'https://my-json-server.typicode.com/kreautz/latihan-pwa-api/mahasiswa';
    // var _url = 'https://my-json-server.typicode.com/techtona/latihan_pwa_api/mahasiswa';
    // var _url = 'connect.php';

    // menampung data yang didapat dari API
    var result = '';

    // menampung gender sbg option
    var gender_opt = '';

    //menampung semua gender dari API
    var gender = [];

    $.get(_url, function(data) {
        $.each(data, function (key, items) {
            // untuk menampung gender sementara pd loop
            _gend = items.gender;

            result += '<div>'+'<p><b>'+items.name+'</b></p>'+'<p>'+_gend+'</p>'+'</div>';

            if ($.inArray(_gend,gender) === -1){
                // jika gender tidak ada didalam array gender maka masukkan gender opt
                gender.push(_gend);
                gender_opt += '<option value="'+_gend+'">'+_gend+'</option>';
            }
        });

        $('#mhs-list').html(result);
        $('#gender-select').html('<option value="semua">Semua</option>'+gender_opt);  
    });

    $('#gender-select').on('change', function(){
        updateList($(this).val());
    });

    function updateList(opt){
        var _url2 = _url;

        if (opt !== 'semua') {
            _url2 = _url +'?gender='+opt;
        }

        // menampung data yang didapat dari API
        var result = '';

        // menampung gender sbg option
        var gender_opt = '';

        //menampung semua gender dari API
        var gender = [];

        $.get(_url2, function(data) {
            $.each(data, function (key, items) {
                // untuk menampung gender sementara pd loop
                _gend = items.gender;

                result += '<div>'+'<p><b>'+items.name+'</b></p>'+'<p>'+_gend+'</p>'+'</div>';

                if ($.inArray(_gend,gender) === -1){
                    // jika gender tidak ada didalam array gender maka masukkan gender opt
                    gender.push(_gend);
                    gender_opt += '<option value="'+_gend+'">'+_gend+'</option>';
                }
            });

            $('#mhs-list').html(result);
        });
    }
});

if ('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/sw.js').then(
            function(reg){
                console.log('SW regis sukses',reg.scope)
            },
            function(err){
                console.log('SW regis failed', err);
        })
    })
};