$(document).ready(function(){
    let pattern = new RegExp("^(https:\/\/" + location.host + "\/|http:\/\/" + location.host + "\/|\/\/" + location.host + "\/|" + location.host + "\/|\/(?!\/))"), // "^\/(?!\/)" - "начинается с /, но дальше - не /"
        pattern_protocol = new RegExp("^(http:\/\/|https:\/\/|\/\/)"), // да, "просто двойной слеш" тоже здесь
        pattern_lochost = new RegExp("^(" + location.host + ")");
    $(document).on('click', 'a[href]', function(e){
        e.preventDefault();
        if(!$(this).attr('href')){console.log('no href'); return false;} //<a /> -  without href => err
        let url = $(this).attr('href'),
            isLocal = (pattern.test(url));
        if(isLocal){
            console.log('Local link: '+url);
            if(pattern_protocol.test(url)){url = url.replace(pattern_protocol, '');}
            if(pattern_lochost.test(url)){url = url.replace(pattern_lochost, '');}
            //if link is local => return url without http:// or http:// and domain
            $('#renderBody').load(url+"Partial");
            window.history.pushState({uri: url}, null, url); //change url to keep page after reload
            return false;
        }else{
            console.log('External link: '+url);
            //if link not local => add protocol before domain
            url = (pattern_protocol.test(url)) ? url : 'http://'+url;
            window.open(url, '_blank');
        }
    });
    $(window).bind('popstate', function(){
        location.reload();
    });
});
