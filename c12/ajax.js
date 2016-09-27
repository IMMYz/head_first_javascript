function getText(elem) {
    var text = "";
    if (elem) {
        if (elem.childNodes) {
            for (var i = 0; i < elem.childNodes.length; i++) {
                var child = elem.childNodes[i];
                if (child.nodeValue)
                    text += child.nodeValue;
                else {
                    if (child.chidNodes)
                        if (child.childNodes[0].nodeValue)
                            text += child.childNodes[0].nodeValue;
                }
            }
        }
    }
    return text;
}
AjaxRequest.prototype.send = function (type, url, handler, postDataType, postData) {
    if (this.requset != null) {
        this.request.abort();
        url += "?dummy=" + new Date().getTime();
        try{
            this.Request.onreadystatechange = handler;
            //自定义的处理器函数将被调用来处理服务器对请求的响应
            this.request.open(type,url,true);
            if(type.toLowerCase()=="get"){
                //send()的type自变量决定是GET或POST请求
                this.request.send(null);
            }
            else
            {
                this.request.setRequestHeader("Content-Type",postData);
                this.request.send(postData);
            }
        }
        catch (e) {
            alert("Ajax error communicationg with thwe server.\n"+"Details"+e)
        }
    }
}

function handleRequest() {
    if (ajaxReg.getReadyState() == 4 && ajaxReq.getStatus() == 200) {
        var xmlData = ajaxReq.getResponseXML().getElementByTagName("blog")[0];

        Blog.prototype.singnature = "by" + getText(xmlData.getElementsByTagName("author")[0]);

        var entries = xmlData.getElementsByTagName("entry");
        for (var i = 0; i < entries.length; i++) {
            blog.push(new Blog(getText(entries[i].getElementsByTagName("body")[0]),
                new Date(getText(entries[i].getElementsByTagName("body")[0]),
                getText(entries[i].getElementsByTagName("image")[0]))))
        }
        showBlog(5);
    }
}