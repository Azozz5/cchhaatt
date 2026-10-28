var socket = null,
    users = [],
    rooms = [],
    myid = null,
    myroom = null,
    nopm = false,
    updateTypingT = true,
    isreplydone = null,
    nonot = false,
    islove = false,
    istalkmicro = 5000,
    callstat = 0,
    istalkromm = false,
    isrecorder = false,
    islost = false,
    isstopmic,
    bcc = 0,
    isrepl = false,
    pickedfile = null,
    power = {},
    IsMyTV = "",
    cooment = false,
    dbcb = false,
    powers = [],
    spsh,
    emos = [],
    ekstra = [],
    sico = [],
    dro3 = [],
    photoup = [],
    back = [],
    token = "",
    rbans = [],
    blocked = [],
    gh = "",
    ux = {},
    lk = null,
    timest,
    widthst = 1,
    cpend = false,
    tbox,
    tboxid = null,
    tboxl = 0,
    ucach = {},
    allcooment = {},
    rcach = {},
    typing = false,
    visitorId = null,
    showmsgs = null,
    lastTypingTime,
    needSort = true;
prs();
function stringGen(len) {
    var text = "";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++) text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}
setInterval(() => {
    if (showmsgs != null) {
        socket.emit("showmsg", {
            showmsgs,
            myid,
        });
    }
}, 500);
const updateTyping = function (id) {
    if (!typing) {
        typing = true;
        socket.emit("typing", id);
    }
    lastTypingTime = new Date().getTime();
    setTimeout(function () {
        var typingTimer = new Date().getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= 1000 && typing) {
            socket.emit("stopTyping", id);
            typing = false;
        }
    }, 1000);
};
function logout() {
    SEND_EVENT_SEOHOST("logout", {});
    $("#d2").click();
    close(1);
}
function toEnglishDigits(str) {
    var e = "۰".charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t) {
        return t.charCodeAt(0) - e;
    });
    e = "٠".charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
        return t.charCodeAt(0) - e;
    });
    return str;
}
function sendbc(wfile) {
    if (wfile) {
        pickedfile = null;
        sendfile("d2bc", function () {
            var msg = $(".tboxbc").val();
            $(".tboxbc").val("");
            var link = pickedfile;
            pickedfile = "";
            if ((msg == "%0A" || msg == "%0a" || msg == "" || msg == "\n") && (link == "" || link == null)) {
                return;
            }
            SEND_EVENT_SEOHOST("bc", {
                msg: toEnglishDigits(msg),
                link: link,
            });
            return;
        });
        return;
    } else {
        pickedfile = null;
    }
    var msg = $(".tboxbc").val();
    $(".tboxbc").val("");
    var link = pickedfile;
    pickedfile = "";
    if ((msg == "%0A" || msg == "%0a" || msg == "" || msg == "\n") && (link == "" || link == null)) {
        return;
    }
    SEND_EVENT_SEOHOST("bc", {
        msg: toEnglishDigits(msg),
        link: link,
    });
}
var isIphone = false,
    isbust;
function onlines() {
    socket.emit("isstates", 0);
}
function puys() {
    isbust = setTimeout(function () {
        socket.emit("isstates", 1);
        puys();
    }, 60000 * 3);
}
function refr() {
    var r = document.referrer || "";
    if (r.indexOf("http://" + location.hostname) == 0) {
        return "";
    }
    if (r.indexOf("://") != -1) {
        r = r.replace(/(.*?)\:\/\//g, "").split("/")[0];
    }
    return r;
}
function checkupdate() {
    if (needUpdate && $("#dpnl:visible").find("#users.active,#rooms.active").length > 0) {
        updateusers();
        updaterooms();
        needUpdate = false;
        needSort = true;
    }
    if (myid != null && cpend == false && tbox != null) {
        var t = $(tbox).find(".tbox:visible");
        var tl = t.length > 0 ? t.val().length : 0;
        if (t.length > 0 && tl > 0 && tboxl != 1 && tboxid != null) {
            tboxl = 1;
            SEND_EVENT_SEOHOST("ty", [tboxid, 1]);
        } else {
            if (tl == 0 && tboxl != 0) {
                tboxl = 0;
                SEND_EVENT_SEOHOST("ty", [tboxid, 0]);
            }
        }
    }
    if (needSort && $("#dpnl:visible").find("#rooms.active").length) {
        needSort = false;
        $("#rooms")
            .find(".room")
            .sort(function (a, b) {
                var av = parseInt($(a).attr("v"));
                var bv = parseInt($(b).attr("v"));
                if (av == bv) {
                    return ($(a).find(".u-topic").text() + "").localeCompare($(b).find(".u-topic").text() + "");
                }
                return av < bv ? 1 : -1;
            });
    }
    setTimeout(checkupdate, 2000);
}
var mdv = "";
function loadfp() {
    try {
        if (typeof window.name == "string") {
            if (window.name.indexOf("{") == 0 && window.name.lastIndexOf("}") == window.name.length - 1) {
                var op = JSON.parse(window.name);
                setv("fp1", op.fp1 || "");
                setv("cc", op.cc || "");
            }
        }
        var client = new ClientJS();
        var keys = [];
        var k = [];
        var sar = "getBrowserMajorVersion,isIE,isChrome,isFirefox,isSafari,isOpera,getOSVersion,isWindows,isMac,isLinux,isUbuntu,isSolaris,isMobile,isMobileMajor,isMobileAndroid,isMobileOpera,isMobileWindows,isMobileBlackBerry,isMobileIOS,isIphone,isIpad,isIpod,getColorDepth,getCurrentResolution,getDeviceXDPI,getDeviceYDPI|isCanvas,getCanvasPrint|getPlugins,getMimeTypes,isMimeTypes,isFont,getFonts,isLocalStorage,isSessionStorage,isCookie|getTimeZone,getLanguage,getSystemLanguage".split(
            "|"
        );
        var hh = "";
        for (var ii = 0; ii < sar.length; ii++) {
            var sh = sar[ii].split(",");
            for (var io = 0; io < sh.length; io++) {
                var vl = "";
                try {
                    vl = (client[sh[io]]() || "") + "";
                } catch (er) {}
                keys.push(vl);
            }
            hh += "|" + hash(keys, 256);
            keys = [];
        }
        var cc = getv("cc") || "";
        var fp = getv("fp1") || "";
        var rf = getv("refr") || "";
        fp = (client.getOS().replace("Windows", "Win") + client.getOSVersion()).split(" ").join("-").split("_").join("-") + hh;
        setv("fp1", fp);
        if (cc == "") {
            cc = ccode();
            setv("cc", cc);
        }
        window.name = JSON.stringify({
            fp1: fp,
            cc: cc,
        });
        mdv = fp.split(".").join("|") + "|" + hash([rf], 256) + "|" + cc;
        ismydeb = fp.split(".").join("|") + "|" + hash([rf], 256) + "|" + cc;
    } catch (err) {
        var cc = getv("cc");
        if (cc == "" || cc == null) {
            cc = ccode();
            setv("cc", cc);
        }
        return "ERR." + cc;
    }
}
loadfp();
        async function measureInternetSpeed() {
            const startTime = new Date().getTime();
            try {
                const response = await fetch('/', { cache: 'no-store' });
                const endTime = new Date().getTime();
                const duration = endTime - startTime; // بالمللي ثانية
                
                const speedResultElement = document.getElementById('ping');
                speedResultElement.textContent = `${duration}ms`;

                if (duration < 200) {
                    speedResultElement.className = 'fast';
                } else {
                    speedResultElement.className = 'slow';
                }
            } catch (error) {
                console.error('Error measuring speed:', error);
                document.getElementById('ping').textContent = 'Error measuring speed';
            }
        }

        function startMeasuring() {
            measureInternetSpeed(); // قياس السرعة فور الضغط على الزر
            setInterval(measureInternetSpeed, 1000); // قياس السرعة كل 5 ثواني
        }
function ut() {
    var navigator_info = window.navigator;
    var screen_info = window.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, "");
    uid += navigator_info.plugins.length;
    uid += screen_info.height || "";
    uid += screen_info.width || "";
    uid += screen_info.pixelDepth || "";
    return uid;
}
function deviceget() {
    var clientb = new ClientJS();
    if (!getv("sdc")) {
        setv("sdc", ut());
        setv("sdn", ut());
        mdv = getv("idph") + clientb.getBrowser();
        return {
            wk: getv("fp1") + "|" + getv("cc"),
            c: getv("sdn").slice(15, 18),
            browser: clientb.getBrowser(),
            dtoday: new Date().getTime(),
            plt: clientb.getOS().replace("Windows", "Win"),
            version: clientb.getOSVersion(),
        };
    } else {
        return {
            wk: getv("fp1") + "|" + getv("cc"),
            c: getv("sdn").slice(15, 18),
            browser: clientb.getBrowser(),
            dtoday: new Date().getTime(),
            plt: clientb.getOS().replace("Windows", "Win"),
            version: clientb.getOSVersion(),
        };
    }
}

function load() {
    lstat("success", " ");
    isIphone = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
    if (typeof $ == "undefined" || typeof io == "undefined") {
        close(5000);
        return;
    }
    if ($("").tab == null) {
        close(5000);
        return;
    }
    if (isIphone) {
        $('img[data-toggle="popover"]').removeClass("nosel");
        fxi();
    }
    checkupdate();
    puys();
    $("#rhtml .utopic").css("margin-left", "6px");
    umsg = $("#umsg").html();
    loadpro();
    loadblocked();
    if ($(window).width() <= 400) {
        $("meta[name='viewport']").attr("content", " user-scalable=0, width=400, interactive-widget=resizes-content");
    }
    if ($(window).width() >= 600) {
        $("meta[name='viewport']").attr("content", " user-scalable=0, width=600, interactive-widget=resizes-content");
    }
    $("#d2").click(function () {
        if (spsh) {
            if (spsh.css("display") == "block") {
                spsh.hide();
            }
        }
    });
    $("#tbox").css("background-color", "#AAAAAF");
    $(".rout").hide();
    $(".redit").hide();
    $("#u1").val(decode(getv("u1")));
    $("#u2").val(decode(getv("u2")));
    $("#pass1").val(decode(getv("p1")));
    if (getv("isl") == "yes") {
        $('.nav-tabs a[href="#member"]').tab("show");
    }
    uhtml = $("#uhtml").html();
    rhtml = $("#rhtml").html();
    phtml = $("#broadcasters").html();
    $(".ae").click(function (params) {
        $(".phide").click();
    });
    var dbg = getUrlParameter("debug") == "1";
    if (dbg) {
        window.onerror = function (errorMsg, url, lineNumber) {
            alert("Error: " + errorMsg + " Script: " + url + " Line: " + lineNumber);
        };
    }
    function oidbg(ev, data) {
        if (dbg == false) {
            return;
        }
        if (typeof data == "object") {
            data = JSON.stringify(data);
        }
        alert(ev + "\n" + data);
    }
    if (getv("refr") == "") {
        setv("refr", refr());
    }
    if (getv("r") == "") {
        setv("r", getUrlParameter("r") || "*");
    }
    $(window).on("resize pushclose pushopen", fixSize);
    $('*[data-toggle="tab"]').on("shown.bs.tab", function (e) {
        fixSize();
    });
    $(".storymuted").click(function () {
        if ($(this).hasClass("fa-volume-up")) {
            $(".st_v").prop("muted", true);
            $(this).removeClass("fa-volume-up");
            $(this).addClass("fa-volume-off");
        } else {
            $(this).addClass("fa-volume-up");
            $(this).removeClass("fa-volume-off");
            $(".st_v").prop("muted", false);
        }
    });
    $(".storyplay").click(function () {
        if ($(this).hasClass("fa-play")) {
            $(".st_v")[0].pause();
            $(this).removeClass("fa-play");
            $(this).addClass("fa-pause");
        } else {
            $(this).addClass("fa-play");
            $(this).removeClass("fa-pause");
            $(".st_v")[0].play();
        }
    });
    $(".supstory").click(function () {
        SEND_EVENT_SEOHOST("SEND_EVENT_EMIT_REMOVE_STORY", {
            id: STORY_DEFALUT.id,
        });
    });
    // $("#tbox").click(function(params) {
    //     $(".phide").click();
    // });
    $("#tbox").keyup(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            TSEND_EVENT_SEOHOST();
        }
    });
    $(".tboxbc").keyup(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            sendbc();
        }
    });
    setTimeout(function () {
        newsock();
        $.ajaxSetup({
            cache: false,
        });
    }, 50);
    fixSize();
	startMeasuring();
	mutednot();
    mutednot1();
    setInterval(function () {
        updateTimes();
    }, 1000 * 1);
    setTimeout(function () {
        refreshonline();
    }, 500);
}
function SEND_EVENT_SEOHOST(cmd, data) {
    onlines();
    clearTimeout(isbust);
    puys();
    socket.emit("msg", {
        cmd: cmd,
        data: data,
    });
}
var TV = false,
    isurlradio = [];
function ShowTV() {
    if (TV == false) {
        TV = true;
        const MyLine = IsMyTV.split(",");
        for (var i = 0; i < MyLine.length; i++) {
            const islisturl = isurlradio.findIndex((x) => x == MyLine[i]);
            if (islisturl == -1) {
                isurlradio.push(MyLine[i]);
                if (MyLine[i].includes(".mp3")) {
                    $("#mic").append('<audio controls="" loop="" play=""><source src="' + MyLine[i] + '"></audio>');
                } else if (MyLine[i]) {
                    $("#mic").append('<iframe src="' + MyLine[i] + '" style="border-radius: 15px;width:100%;height:200px;" scrolling="no" frameborder="no" allowfullscreen></iframe>');
                }
            }
        }
        $("#tv_box").fadeIn();
    } else {
        TV = false;
        $("#tv_box").fadeOut();
    }
}
function ShowPool(_0x133f62) {
  _0x133f62 == 1 ? $('.pallboll').fadeOut() : ($('.pallboll').fadeIn(), !$('.pallboll').find('iframe').attr('src') && $('.pallboll').find('iframe').attr('src', 'https://games.cdn.famobi.com/html5games/0/8-ball-billiards-classic/v250/?fg_domain=play.famobi.com&fg_aid=A-FAMOBI-COM&fg_uid=82038e98-d4e1-46dd-8de9-1460d1395eab&fg_pid=96ab9c2f-6013-4b31-96dc-ccb5c7a89329&fg_beat=976&original_ref=https%3A%2F%2Ffamobi.com%2F'));
}
function famobi(_0x133f62) {
  _0x133f62 == 1 ? $('.famobii').fadeOut() : ($('.famobii').fadeIn(), !$('.famobii').find('iframe').attr('src') && $('.famobii').find('iframe').attr('src', 'https://games.cdn.famobi.com/html5games/s/solitaire-classic/v420/?fg_domain=play.famobi.com&fg_aid=A-SU86Z&fg_uid=bf3054b9-540f-474d-9288-7e262df73e4a&fg_pid=93d42260-3c31-4339-899b-bfd3d1fe0c79&fg_beat=771&original_ref='));
}
function SubDame(_0x133f62) {
  _0x133f62 == 1 ? $('.SubG').fadeOut() : ($('.SubG').fadeIn(), !$('.SubG').find('SubG').attr('src') && $('.SubG').find('iframe').attr('src', 'https://ubg77.github.io/updatefaqs/subway-surfers-winter-holiday/'));
}

$(function () {
    var istogladmin = true;
    $("#myadmin").click(function () {
        if (istogladmin) {
            istogladmin = false;
            $(".notadmin").hide();
            $(".isadmin").show();
            $("#myadmin").text("أدوات اخرى");
        } else {
            istogladmin = true;
            $(".isadmin").hide();
            $(".notadmin").show();
            $("#myadmin").text("أدوات إداريه");
        }
    });
});
var Mystram, mediaRecorder;
function StartRecorder(id) {
    if (isrecorder == false && istalkromm == false) {
        if (id) {
            $(".microphone").css("display", "none");
            $(".stopmico").css("display", "block");
            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                })
                .then(function (mediaStream) {
                    Mystram = mediaStream;
                    mediaRecorder = new MediaRecorder(mediaStream);
                    mediaRecorder.onstart = function (e) {
                        this.chunks = [];
                    };
                    mediaRecorder.ondataavailable = function (e) {
                        this.chunks.push(e.data);
                    };
                    mediaRecorder.onstop = function (e) {
                        var blob = new Blob(this.chunks, {
                            type: "audio/m4a",
                        });
                        SEND_EVENT_SEOHOST("sendVoice", {
                            voice: blob,
                            id: id,
                        });
                        isrecorder = false;
                    };
                    isrecorder = true;
                    mediaRecorder.start();
                });
        }
    } else {
        alert("الرجاء المحاولة في وقت لاحق");
    }
}
function StopRecorder(state) {
    $(".microphone").css("display", "block");
    $(".stopmico").css("display", "none");
    if (state) {
        mediaRecorder.stop();
        isrecorder = false;
    }
    if (Mystram != null) {
        Mystram.getTracks().forEach(function (track) {
            track.stop();
            Mystram = null;
        });
    }
}
var tried = 0;
function retry() {
    fixSize(1);
    tried++;
    if (myid != null && lk != null && tried <= 6) {
        cpend = true;
        $(".ovr").remove();
        if ($(".ovr").length == 0) {
            $(document.body)
                .append(`<div class="ovr" style="width:100%;height:100%;z-index:999999;position: fixed;left: 0px;top: 0px;background-color: rgba(0, 0, 0, 0.6);"><div style="margin: 25%;margin-top:5%;border-radius: 4px;padding: 8px;width: 220px;" class=" bg-warning"><button class="btn btn-danger fr" style="
            margin-top: -6px;
            margin-right: -6px;
        " onclick="$(this).hide();window.close(100);">[ x ]</button><div>.. يتم إعاده الاتصال</div></div></div>`);
        }
        setTimeout(function () {
            newsock();
        }, 2500);
        return;
    }
    close();
}
function escapeHtml(str) {
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return str.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}
function newsock() {
    var trans = "WebSocket" in window || "MozWebSocket" in window ? ["websocket"] : ["polling", "websocket"];
    loadfp();
    socket = io("", {
        reconnection: true,
        recovered:true,
        closeOnBeforeunload: false,
        transports: trans,
        query: deviceget(),
    });
    socket.emit("isVistor", mdv);
    socket.on("connect", function () {
        if (socket.recovered) {
            if (myid) {
                $("div#message-box").removeClass("hide");
                $("div#message-box1").addClass("hiden");
                setTimeout(() => {
                    $("div#message-box1").removeClass("hiden");
                    $("div#message-box1").addClass("hide");
                }, 1000);
                setTimeout(() => {
                    $("div#message-box").addClass("hiden");
                    setTimeout(() => {
                        $("div#message-box").removeClass("hiden");

                        $("div#message-box").addClass("hide");
                    }, 500);
                }, 2500);
            }
        } else {
            if (myid) {
                $("div#message-box2").removeClass("hide");
                $("div#message-box1").addClass("hiden");
                setTimeout(() => {
                    close(1);
                }, 1000);
            }
        }
        fixSize();
        socket.emit("gh", {
            gh: gh,
        });
        $(".ovr div").attr("class", "bg-info").find("div").text("متصل .. يتم تسجيل الدخول");
        lstat("success", "متصل");
        $("#tlogins button").removeAttr("disabled");
        if (myid != null && lk != null && cpend) {
            socket.emit("rc", {
                token: token,
                n: lk,
            });
        }
        if (getUrlParameter("enter") != null && cpend == false) {
            $("#u1").val(hash([new Date().getTime()], 256) + "_زائر");
            login(1);
        }
    });
    var o = null;
    var itv = setInterval(() => {
        if (o != null && power != null) {
            if (
                power.rank != o.rank ||
                power.name != o.name ||
                power.unick != o.unick ||
                power.alert != o.alert ||
                power.ban != o.ban ||
                power.bootedit != o.bootedit ||
                power.cp != o.cp ||
                power.createroom != o.createroom ||
                power.delbc != o.delbc ||
                power.delmsg != o.delmsg ||
                power.delpic != o.delpic ||
                power.edituser != o.edituser ||
                power.flter != o.flter ||
                power.forcepm != o.forcepm ||
                power.grupes != o.grupes ||
                power.history != o.history ||
                power.ico != o.ico ||
                power.kick != o.kick ||
                power.loveu != o.loveu ||
                power.meiut != o.meiut ||
                power.msgs != o.msgs ||
                power.mynick != o.mynick ||
                power.owner != o.owner ||
                power.publicmsg != o.publicmsg ||
                power.roomowner != o.roomowner ||
                power.rooms != o.rooms ||
                power.setpower != o.setpower ||
                power.shrt != o.shrt ||
                power.stealth != o.stealth ||
                power.subs != o.subs ||
                power.ulike != o.ulike ||
                power.upgrades != o.upgrades
            ) {
                document.body.innerHTML = "";
                close(1);
            }
        }
    }, 100);
    var ok = false;
    socket.on("msg", function (data) {
        if (data.cmd == "ok") {
            ok = true;
        }
        if (data.cmd == "nok") {
            ok = false;
            lk = null;
        }
        if (!cpend && ok && data.cmd == "ok") {
            lk = data.k;
        }
        if (data.cmd == "power") {
            o = Object.assign({}, data.data);
        }
        if (data.cmd == "powers" && o != null) {
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].name == o.name) {
                    o = Object.assign({}, data.data[i]);
                }
            }
        }
        ondata(data.cmd, data.data);
    });
    socket.on("broadcasting", function (e) {
        fx(e);
    });
    socket.on("disconnect", function (data) {
        if (myid) {
            $("div#message-box1").removeClass("hide");
        }else{
            lstat("danger", "غير متصل");
            retry();
        }
        
    });
    socket.on("connect_error", function (data) {
        $(".ovr div").attr("class", "bg-danger").find("div").text("فشل الاتصال ..");
        console.log("connect_error");
        lstat("danger", "غير متصل");
    });
    socket.on("connect_timeout", function (data) {
        $(".ovr div").attr("class", "bg-danger").find("div").text("فشل الاتصال ..");
        console.log("connect_timeout");
        lstat("danger", "غير متصل");
    });
    socket.on("error", function (data) {
        $(".ovr div").attr("class", "bg-danger").find("div").text("فشل الاتصال ..");
        console.log("error");
        lstat("danger", "غير متصل");
    });
}
function fxi() {
    if (isIphone) {
        $("input").on("focus", function () {
            fixI(this);
        });
        $("input").on("blur", function () {
            blurI(this);
        });
        document.addEventListener("focusout", function (e) {
            window.scrollTo(0, 0);
        });
    }
}
function fixI(el) {
    if (isIphone == false) {
        return;
    }
    var sv = $(el).position().top - (document.body.scrollHeight - window.innerHeight) - 10;
    if (sv < document.body.scrollHeight + window.innerHeight) {
    }
    $(document.body).scrollTop(sv);
}
function blurI() {
    if (isIphone == false) {
        return;
    }
    $(document.body).scrollTop(0);
}
function removegifpic(data) {
    if (data.includes("png")) {
        return data;
    } else if (data.includes("picroom")) {
        return data;
    } else {
        return data.replace("gif", "jpg") + ".jpg";
    }
}
function mutednot() { var latarshia = document.getElementById("beep");
        latarshia.mute === true ? (document.getElementById("beep").muted = false, $("#mute").css("display", "none")) : (document.getElementById("beep").muted = true, $("#mute").css("display", "none"), $("#mute1").css("display", "block")) }

function mutednot1() { var gristian = document.getElementById("beep");
        gristian.mute === false ? (document.getElementById("beep").muted = true, $("#mute1").css("display", "none")) : (document.getElementById("beep").muted = false, $("#mute1").css("display", "none"), $("#mute").css("display", "block")) }

function imageExists(image_url) {
    var http = new XMLHttpRequest();
    http.open("HEAD", image_url, false);
    http.SEND_EVENT_SEOHOST();
    return http.status != 404;
}
function removegifs(data) {
    if (imageExists(data.replace("gif", "jpg") + ".jpg")) {
        return data.replace("gif", "jpg") + ".jpg";
    } else {
        return data;
    }
}
function getop() {
    $.get("top10", function (d) {
        if (typeof d == "string") {
            d = JSON.parse(d);
        }
        var data = d;
        var ltop = $(".ltop");
        ltop.children().remove();
        var utop = $("#utop").html();
        ltop.children().remove();
        $.each(data, function (i, e) {
            if (i < 10) {
                if (i == 0) {
                    $(".u-top1").attr("src", e.pic);
                    $(".u-top1").css("border", "3pt solid rgb(252 186 41)");
                    $(".u-topic1").text(e.topic);
                    $(".u-topic1").css("color", "rgb(252 186 41)");
                } else if (i == 1) {
                    $(".u-top2").attr("src", e.pic);
                    $(".u-top2").css("border", "3pt solid hsl(216deg 25% 80%)");
                    $(".u-topic2").text(e.topic);
                    $(".u-topic2").css("color", "hsl(216deg 25% 80%)");
                } else if (i == 2) {
                    $(".u-top3").attr("src", e.pic);
                    $(".u-top3").css("border", "3pt solid hsl(23deg 84% 70%)");
                    $(".u-topic3").css("color", "hsl(23deg 84% 70%)");
                    $(".u-topic3").text(e.topic);
                } else {
                    var uh = $(utop);
                    uh.find(".ntop").text(i + 1);
                    uh.find(".u-topic").text(e.topic);
                    uh.find(".u-pic").attr("src", e.pic);
                    uh.find(".co").text(e.evaluation);
                }
                ltop.append(uh);
            }
        });
    });
}
function refreshonline() {
    $.get("getonline", function (d) {
        if (typeof d == "string") {
            d = JSON.parse(d);
        }
        var data = d;
        powers = data.powers;
        var lonline = $(".lonline");
        lonline.children().remove();
        var uhtml = $("#userslogin").html();
        $(".s1").text(data.online.length);
        $.each(data.online, function (i, e) {
            if (e.s == true) {
                return;
            }
            var uh = $(uhtml);
            uh.find(".username__wrapper").text(e.topic).css({
                "background-color": e.bg,
                color: e.ucol,
            });
            uh.find(".chat_pane__user_item__status span").html(emo(e.msg));
            uh.find(".chat_pane__user_item__avatar .state_active").attr("src", e.pic);
            uh.find(".chat_pane__user_item__avatar .state_active").attr("onclick", "showphoto('" + e.pic + "')");
            uh.find(".ustat").remove();
            if (e.co == "--" || e.co == null || e.co == "A1" || e.co == "A2" || e.co == "EU") {
                uh.find(".chat_pane__user_item__flag").remove();
            } else {
                uh.find(".chat_pane__user_item__flag").attr("src", "flag/" + (e.co.toLowerCase().replace("il", "ps") || "tn") + ".png");
            }
            var ico = getico(e);
            if (ico != "") {
                uh.find(".username__icon").attr("src", ico);
            }
            lonline.append(uh);
            if ($(".chat_pane__user_item").length == 50) {
                $(".chat_pane__user_item").first().remove();
            }
        });
    });
}
function fixSize(again) {
    var w = $(document.body).innerWidth();
    $(document.documentElement).css("height", $(window).height() - 2 + "px");
    docss();
    startcss();
    var lonline = $(".lonline");
    if (lonline.length > 0) {
        lonline.css("height", $(window).height() - 23 - lonline.position().top - 5 + "px");
    }
    lonline.css("margin-bottom", 23 + "px");
    $("#dpnl")
        .css("left", $(".dad").width() - ($("#dpnl").width() + 2) + "px")
        .css("height", $("#room").height() - ($("#d0").height() + 2) + "px")
        .css("top", "0px");
    if (again != 1) {
        setTimeout(function () {
            fixSize(1);
        }, 10);
    } else {
        $("#d2").scrollTop($("#d2")[0].scrollHeight);
    }
}
function startcss() {
    $.each($(".tab-pane"), function (i, e) {
        if ($(e).hasClass("active")) {
            $(e).removeClass("hid");
        } else {
            $(e).addClass("hid");
        }
    });
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
        $($(e.relatedTarget).attr("href")).addClass("hid");
        $($(e.target).attr("href")).removeClass("hid");
    });
}
function docss() {
    $.each($(".filw"), function (i, e) {
        var par = $(e).parent();
        var wd = 0;
        $.each(par.children(), function (ii, child) {
            if ($(child).hasClass("filw") || $(child).hasClass("popover") || $(child).css("position") == "absolute") {
                return;
            }
            wd += $(child).outerWidth(true);
        });
        $(e).css("width", par.width() - wd - 12 + "px");
    });
    $.each($(".filh"), function (i, e) {
        var par = $(e).parent();
        var wd = 0;
        $.each(par.children(), function (ii, child) {
            if ($(child).hasClass("filh") || $(child).css("position") == "absolute") {
                return;
            }
            wd += $(child).outerHeight(true);
        });
        $(e).css("height", par.height() - wd - 1 + "px");
    });
}
function pickedemo(e) {
    e = $(e);
    var ei = e.attr("title");
    var par = $(e.attr("eid"));
    par.parent()
        .find(".tbox")
        .val($(par).parent().find(".tbox").val() + ei);
    par.popover("hide").blur();
}
function roomChanged(isme) {
    $("#users").find(".inroom").removeClass("inroom");
    $("#rooms").find(".inroom").removeClass("inroom");
    var r = getroom(myroom);
    $(".bord").removeClass("bord");
    if (r != null) {
        $(".ninr,.rout").show();
        if ($("#room.active").length == 0 && isme == true) {
            $("[data-target='#room']").trigger("click");
        }
        if (isme == true) {
            $("[data-target='#room']").show();
        }
        $.each(rusers(r.id), function () {
            $("#users")
                .find(".uid" + this.id)
                .addClass("inroom");
        });
        $("#rooms")
            .find(".r" + r.id)
            .addClass("inroom bord");
        $("#tbox").css("background-color", "");
        var u = getuser(myid);
        if (u && (r.owner == u.lid || power.roomowner == true)) {
            $(".redit").show();
        }
    } else {
        $(".roomtgl").hide();
        if (isme) {
            $("[data-target='#room']").hide();
        }
        if ($("#room.active").length != 0 && isme == true) {
            $("[data-target='#rooms']").trigger("click");
        }
        $(".ninr").hide();
        $(".rout").hide();
        $(".redit").hide();
        $("#tbox").css("background-color", "#AAAAAF");
    }
}
function emopop(eid) {
    var emo = $(eid);
    emo.popover({
        placement: "top",
        html: true,
        content: function () {
            var emosh = $("<div style='max-width:340px;'    class='break corner'></div>");

            $.each(emos, function (i, e) {
                const num2 = ekstra[i];
                setTimeout(() => {
                    $(".emoi").attr("onmousedown", "pickedemo(this )");
                    $(".emoi").attr("eid", eid);
                }, 50);
                emosh.append('<img style="margin:2px;" class="emoi hand corner" src="' + e + '" title="' + num2 + '">');
            });

            return emosh[0].outerHTML;
        },
        title: "",
    });
}
function prs() {
    var vl = isnl(getv("gh")) ? (isnl(window.name) ? "" : window.name) : getv("gh");
    gh = isnl(gh) ? vl : gh;
    setv("gh", gh);
    window.name = gh;
}
function isnl(s) {
    return s == null || s == "" || s.length < 3 || s.length > 8 || s == "undefined" || s.indexOf("X") != 0;
}
window.onunload = function () {
    prs();
};
var confirmOnPageExit = function (e) {
    e = e || window.event;
    prs();
    var message = "هل تريد مغادره الدردشه؟";
    if (e) {
        e.returnValue = message;
    }
    return message;
};
var ia = {};
function ft(e) {
    e === myid
        ? ($.each(ic.peeres, function (e, t) {
              for (var o in t) o && fj(o, t[o].it);
          }),
          (ia = {}),
          ie && (ie.getTracks().forEach((e) => e.stop()), (ie = null)))
        : $.each(ic.peeres, function (t, n) {
              for (var o in n) e === o && fj(e, n[o].it);
          });
}
function fmute(e) {
    e.preventDefault(), e.stopPropagation();
    var t = $(this);
    if (t.hasClass("stopmic")) {
        var o = t.parent().parent().parent(),
            n = o.attr("id").replace("prod", "");
        if (n === myid || power.createroom) {
            fm({
                it: o.attr("data"),
                target: n,
                type: "hang-up",
            });
        }
        t.parent().parent().parent().find("#showpf").hide();
    } else if (t.hasClass("sounds")) {
        var name = t.attr("id"),
            namebut = t.text();
        var o = t.parent().parent().parent().find("audio")[0];
        if (namebut == "إيقاف الصوت") {
            if (name === myid) {
                ie.getAudioTracks()[0].enabled = false;
            }
            t.text("تشغيل الصوت");
            t.parent().parent().parent().find(".ismute").show();
            o.paused || o.pause();
        } else {
            if (name === myid) {
                ie.getAudioTracks()[0].enabled = true;
            }
            t.text("إيقاف الصوت");
            o.paused && o.play();
            t.parent().parent().parent().find(".ismute").hide();
        }
        t.parent().parent().parent().find("#showpf").hide();
    } else if (t.hasClass("profiles")) {
        var name = t.attr("id"),
            namebut = t.text();
        upro(name);
        t.parent().parent().parent().find("#showpf").hide();
    }
}
function fmutes(e) {
    e.preventDefault(), e.stopPropagation();
    var t = $(this);
    var o = t.parent(),
        n = o.attr("id").replace("prod", "");
    name = t.find("#name").attr("class");
    if (n === myid || power.createroom) {
        $(".stopmic").css("display", "block");
    } else {
        $(".stopmic").css("display", "none");
    }

    if (t.find("#showpf").css("display") == "block") {
        t.find("#showpf").hide();
    } else {
        if (spsh) {
            spsh.hide();
        }
        t.find("#showpf").show();
        spsh = t.find("#showpf");
    }
}
function mutedall() {
    $(".prod")
        .find("audio")
        .each(function () {
            if (this.paused) {
                this.play();
                clearInterval(isstopmic);
                $(".ismute").hide();
                $("#muteall").attr("style", "width: 50px; height: 50px; color: black; background-color: mediumseagreen; margin: -30px; position: absolute; left: 31px; top: 32px; border-radius: 0;");
            } else {
                this.pause();
                isstopmic = setInterval(() => {
                    this.pause();
                }, 200);
                $(".ismute").show();
                $("#muteall").attr("style", "width: 50px; height: 50px; color: white; background: #3D3D3D; margin: -30px; position: absolute; left: 31px; top: 32px; border-radius: 0;");
            }
        });
}
function fp() {
    if (isrecorder == false && istalkromm == false) {
        var e = $(phtml);
        e.find(".evant").off().click(fmutes),
            e.find(".evant i").off().click(fmute),
            e
                .find(".prod")
                .off()
                .click(function () {
                    var e = $(this),
                        t = e.attr("data"),
                        o = ia[t];
                    if (o && o.ev) {
                        var n = e.find("audio")[0];
                        return void n.play();
                    }
                    return getuser(myid).rep >= istalkmicro
                        ? void (
                              !ie &&
                              navigator.mediaDevices
                                  .getUserMedia({
                                      audio: {
                                          channelCount: 1,
                                          sampleRate: 16000,
                                          sampleSize: 16,
                                          volume: 1,
                                      },
                                  })
                                  .then(function (n) {
                                      (ie = n),
                                          fq(e, !0, n),
                                          socket.emit("broadcasting", {
                                              cmd: "new",
                                              it: { t },
                                          }),
                                          (o.ev = !0),
                                          (o.id = myid);
                                  })
                                  .catch(function (e) {
                                      fk(e, t, myid);
                                  })
                          )
                        : void alert("عدد الايكات المطلوبة للمايك" + " " + istalkmicro);
                }),
            $(".broadcasters").html(e);
        $("#d2").css("padding-top", "57px");
        $(".broadcasters").attr("style", "width: 100%;border: none;padding: 2px;height: 52px;");
    } else {
        alert("الرجاء المحاولة في وقت لاحق");
    }
}
function fq(e, t, o) {
    var n = document.createElement("audio");
    (n.srcObject = o),
        (n.muted = t),
        (n.autoplay = !0),
        (n.onpause = function () {
            var t = $(n).parent().find(".evant>#showpf i.sounds")[0];
            $(t).text("إيقاف الصوت"), $(t).text("تشغيل الصوت");
            e.removeClass("is_speaking");
        }),
        (n.onplay = function () {
            var t = $(n).parent().find(".evant>#showpf i.sounds")[0];
            $(t).text("تشغيل الصوت"), $(t).text("إيقاف الصوت");
            e.addClass("is_speaking");
        }),
        n.addEventListener("ended", () => {
            e.removeClass("is_speaking");
        });
    n.addEventListener("canplay", () => {
        e.addClass("is_speaking");
    });
    n.addEventListener("canplaythrough", () => {
        n.play();
    }),
        n.play(),
        $(n).appendTo(e);
}
var ib = null;
function fx(e) {
    switch (e.cmd) {
        case "new":
            if (e.user) {
                (ia[e.it].ev = !0), (ia[e.it].id = e.user);
                var t = getuser(e.user),
                    o = $(".broadcasters .prod[data='" + e.it + "']");
                o.attr("id", "prod" + t.id),
                    o.find("#showpf > .sounds").attr("id", t.id),
                    o.find("#showpf > .profiles").attr("id", t.id),
                    o.children().hide(),
                    o.find("#name").text(t.topic.slice(0, 8)),
                    o.css("background-image", "url(" + t.pic + ")"),
                    o.find(".evant").show();
            } else {
                ib = e.it;
                for (var t, n = 0; n < users.length; n++) (t = users[n]), t.id !== myid && t.roomid === myroom && fn(t.id, ib);
            }
            break;
        case "err":
            fs(e.msg);
            break;
        case "send":
            fo(e.msgString);
            break;
        case "rleave":
            ft(e.user);
            break;
        case "rjoin":
            ie && fn(e.user, ib);
            break;
        case "all":
            $(".broadcasters").html(""),
                fp(),
                (ia = e.data),
                e.data &&
                    $.each(e.data, function (o, e) {
                        if (e.ev) {
                            var t = getuser(e.id),
                                n = $(".broadcasters .prod[data='" + o + "']");
                            n.attr("id", "prod" + t.id),
                                n.find("#showpf > .sounds").attr("id", t.id),
                                n.find("#showpf > .profiles").attr("id", t.id),
                                n.children().hide(),
                                n.find("#name").text(t.topic.slice(0, 8)),
                                n.css("background-image", "url(" + t.pic + ")"),
                                n.find(".evant").show();
                        }
                    });
    }
}
function fo(t) {
    var o = JSON.parse(t);

    switch (o.type) {
        case "video-offer":
            fg(o);
            break;
        case "video-answer":
            fh(o);
            istalkromm = true;
            break;
        case "new-ice-candidate":
            fi(o);
            break;
        case "hang-up":
            var n = $("#prod" + o.target);
            if (ie && myid === o.target) {
                ia[o.it].id === myid && ((ia[o.it].id = ""), (ia[o.it].ev = !1)), ie.getTracks().forEach((e) => e.stop()), (istalkromm = false), (ie = null);
                n.children().show(), n.find(".ismute").hide(), n.removeClass("is_speaking"), n.find(".evant").hide(), n.find("audio").remove(), n.css("background-image", ""), n.attr("id", "");
            }
            $.each(ic.peeres[o.it], function (e, t) {
                fj(t.socketId, t.it);
            });
    }
}
var ic = {
    peeres: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
    },
    get: function (e, t) {
        if (!t || !e) return !1;
        var o = this.peeres[t];
        return o[e];
    },
    set: function (e, t) {
        if (!t.it) return !1;
        var o = this.peeres[t.it];
        o[e] = t;
    },
    delete: function (e, t) {
        if (!t) return !1;
        var o = this.peeres[t];
        delete o[e];
    },
};
async function fr(e, t) {
    var o = new RTCPeerConnection({
        iceServers: [
            {
                username: "Laup55LEXQVtdpJVBiJ72C6D3EF6nt5xNj-gq48pZ6_qKgByx2ouwDW_utQVDNKqAAAAAGQqMAtzZW9iYXFlcg==",
                urls: [
                    "stun:fr-turn1.xirsys.com",
                    "turn:fr-turn1.xirsys.com:80?transport=udp",
                    "turn:fr-turn1.xirsys.com:3478?transport=udp",
                    "turn:fr-turn1.xirsys.com:80?transport=tcp",
                    "turn:fr-turn1.xirsys.com:3478?transport=tcp",
                    "turns:fr-turn1.xirsys.com:443?transport=tcp",
                    "turns:fr-turn1.xirsys.com:5349?transport=tcp",
                ],
                credential: "677e8af8-d1c1-11ed-8229-0242ac120004",
            },
            {
                urls: ["turn:relay1.metered.ca:80?transport=tcp", "turn:relay1.metered.ca:443?transport=tcp"],
                username: "639b693c74aedc15",
                credential: "7566bd5cda6bcf81",
            },
            {
                urls: ["turn:relay1.metered.ca:443"],
                username: "639b693c74aedc15",
                credential: "7566bd5cda6bcf81",
            },
            {
                urls: ["stun:relay1.metered.ca:80"],
            },
        ],
    });
    return (o.socketId = e), (o.it = t), (o.onicecandidate = fa), (o.oniceconnectionstatechange = fb), (o.onicegatheringstatechange = fc), (o.onsignalingstatechange = fd), (o.onnegotiationneeded = fe), (o.ontrack = ff), ic.set(e, o), o;
}
function fa(e) {
    e.candidate &&
        fm({
            type: "new-ice-candidate",
            it: e.currentTarget.it,
            target: e.currentTarget.socketId,
            candidate: e.candidate,
        });
}
function fb(e) {
    var t = ic.get(e.currentTarget.socketId, e.currentTarget.it);
    switch (t.iceConnectionState) {
        case "failed":
            t.restartIce();
            break;
        case "closed":
        case "disconnected":
        // fj(e.currentTarget.socketId, t.it);
    }
}
function fc(e) {
    ic.get(e.currentTarget.socketId, e.currentTarget.it);
}
function fd(e) {
    var t = ic.get(e.currentTarget.socketId, e.currentTarget.it);
    switch (t.signalingState) {
        case "closed":
        // fj(e.currentTarget.socketId, t.it);
    }
}
async function fe(e) {
    try {
        var t = ic.get(e.currentTarget.socketId, e.currentTarget.it);
        const o = await t.createOffer();
        if ("stable" != t.signalingState) return;
        await t.setLocalDescription(o),
            fm({
                it: t.it,
                target: t.socketId,
                type: "video-offer",
                sdp: t.localDescription,
            });
    } catch (e) {
        fl(e);
    }
}
function ff(t) {
    fq($("#prod" + t.currentTarget.socketId), !1, t.streams[0]);
}
function fm(e) {
    var t = JSON.stringify(e);
    socket.emit("broadcasting", {
        cmd: "send",
        mj: t,
    });
}
function fj(t, o) {
    var n = ic.get(t, o),
        s = $("#prod" + t + " audio");
    if (n) {
        if (
            (ia[o].id === t && ((ia[o].id = ""), (ia[o].ev = !1)),
            (n.ontrack = null),
            (n.onnicecandidate = null),
            (n.oniceconnectionstatechange = null),
            (n.onsignalingstatechange = null),
            (n.onicegatheringstatechange = null),
            (n.onnotificationneeded = null),
            n.getTransceivers().forEach((e) => e.stop()),
            s.length && s.parent().attr("data") === o)
        ) {
            s.paused = !0;
            var d = $("#prod" + t);
            d.children().show(), d.removeClass("is_speaking"), d.find(".ismute").hide(), d.find(".evant").hide(), d.find("audio").remove(), d.css("background-image", ""), d.attr("id", "");
        }
        n.close(), ic.delete(t, o);
    }
}
var id = {},
    ie = null;

async function fn(e, t) {
    if (e === myid) return void fs("لايمكنك طلب الاتصال مع نفسك");
    var o = ic.get(e, t);
    o || (o = await fr(e, t));
    try {
        ie.getTracks().forEach(
            (id[e] = (e) =>
                o.addTransceiver(e, {
                    streams: [ie],
                }))
        );
    } catch (o) {
        fk(o, t, e);
    }
}
function DeletAllMassgrtInPublic() {
  SEND_EVENT_SEOHOST('msg', {
    msg: document.getElementById.innerHTML = 'cllear'
  });
}
function addElements(a) {
    var b = document.createElement("div");
    b.classList.add("vieYoutube"), (b.style.cssText = "z-index: 5;float: left;position: absolute;background-color: white;border: 1px solid black;");
    var c = document.createElement("img");
    (c.style.width = "100%"), (c.src = "https://img.youtube.com/vi/" + a + "/0.jpg");
    var d = document.createElement("button");
    (d.innerText = "\u0627\u0631\u0633\u0627\u0644 \u0627\u0644\u0649 \u0627\u0644\u062D\u0627\u0626\u0637"),
        (d.style.width = "50%"),
        (d.style.margin = "2px 0"),
        (d.onclick = function () {
            var c = "https://www.youtube.com/watch?v=" + a;
            $(".tboxbc").val(c), sendbc(), b.remove();
        });
    var e = document.createElement("button");
    (e.style.width = "50%"),
        (e.style.margin = "2px 0"),
        (e.innerText = "\u0627\u0644\u063A\u0627\u0621"),
        (e.onclick = function () {
            b.remove();
        }),
        b.appendChild(c),
        b.appendChild(e),
        b.appendChild(d);
    var f = document.getElementsByClassName("youtubeSearch")[0];
    f.appendChild(b), $(".youtubeLoad").hide();
}
function ondata(cmd, data) {
    try {
        switch (cmd) {
            case "youtube":
                if (myid) {
                    addElements(data);
                }
                break;
            case "typing":
                if (myid) {
                    var v = $(".w" + data).css("display");
                    var l = $("#c" + data).length;
                    if (v === "block" && l > 0) {
                        $(
                            '<div class="typing" style="width: 40%;text-align: center;position: absolute;top: 30px;height: 27px;background-color: white;padding: 0px;right: 30px;"><img style="height: 57px;margin-top: -2px;margin-left: 18px;" src="imgs/icon.gif"><span style="">يكتب الان</span></div>'
                        ).insertAfter(".w" + data + " .head");
                    }
                }
                break;
            case "showmsg":
                if (myid) {
                    $(".w" + data.myid)
                        .find("#seobaqershowmsg")
                        .show();
                }
                break;
            case "Maxrep":
                if (myid) {
                    maxrep = data;
                }
                break;
            case "IsTv":
                if (myid) {
                    if (data.tv) {
                        $("#tvis").css("display", "block");
                        IsMyTV = data.tv;
                    } else {
                        $("#tvis").css("display", "none");
                    }
                    if (data.pool) {
                        $("#pools").css("display", "block");
                    } else {
                        $("#pools").css("display", "none");
                    }
                    isrepl = data.reply;
                    islove = data.love;
                }
                break;
            case "coom":
                cooment = data;
                break;
            case "stopTyping":
                if (myid) {
                    var v = $(".w" + data).css("display");
                    var l = $("#c" + data).length;
                    if (v && l > 0) {
                        $(".w" + data + " .typing").remove();
                    }
                }
                break;
            case "fildel":
                $("#d2bc").empty();
                break;
            case "server":
                $(".s1").removeClass("bg-warning").addClass("bg-success").text(data.online);
                break;
            case "dro3":
                dro3 = data;
                break;
            case "photoup":
                photoup = data;
                break;
                case "back":
                    back = data;
                    break;
            case "sicos":
                sico = data;
                break;
            case "smile2":
                emos = data;
                break;
            case "smile3":
                emos = data;
                break;
            case "seohost":
                $("div#stories").empty();
                break;
            case "seoautu":
                socket.emit("autocoo", "1");
                break;
            case "seobaqer":
                console.log(data);
                break;
            case "smile":
                ekstra = data;
                emopop(".emobox");
                emopop(".emobc");
                emopop(".emobcc");
                break;
            case "removede":
                $("#tlogins button").removeAttr("disabled");
                break;
            case "alert":
                alert(data);
                break;
            case "savepic":
                if (myid) {
                    if(data.ispic==1){
                        $(".spic").attr("src", data.pic);
                    }else if(data.ispic==2){
                        $(".afspic").attr("src", data.pic);
                    }    
                }
                break;
            case "lavedon":
                if (myid) {
                    SEND_EVENT_SEOHOST("rleave", {});
                }
                break;
            case "rjoinad":
                if (myid) {
                    rjoinAdmin(data.rid, data.pwd);
                }
                break;
            case "ok":
                $(".ovr div").attr("class", "bg-success").find("div").text("متصل ..");
                tried = 0;
                setTimeout(function () {
                    $(".ovr").remove();
                }, 1500);
                cpend = false;
                break;
            case "login":
                $("#tlogins button").removeAttr("disabled");
                switch (data.msg) {
                    case "ok":
                        myid = data.id;
                        token = data.ttoken;
                        socket.emit("autocoo", "1");
                        $(".ispoint").text(" " + abbreviateNumber(data.point || 0));
                        $(".spic").attr("src", data.pic);
                        $(".afspic").attr("src", data.afterpic);
                        if(!data.ifedit){
                            $("button.border.label.mini.label-success.hand.fa.fa-edit.fr.prof,.listHome").remove()
                        }
                        window.onbeforeunload = confirmOnPageExit;
                        $(".dad").css("max-width", "100%");
                        $("#tlogins,.lonline").remove();
                        $("#d2,.footer,#d0,#room").show();
                        fixSize(1);
                        if (data.uid) {
                            $("#chngpass").css("display", "block");
                        }

                        $("#crown").attr("src", "imgs/crown.png"),
                            $("#gold").attr("src", "imgs/gold.png"),
                            $("#imgmic").attr("src", "imgs/mic.png"),
                            $("#bronz").attr("src", "imgs/bronz.png"),
                            $("#silver").attr("src", "imgs/silver.png"),
                            $("#si1").attr("src", "imgs/s1.png"),
                            $("#smile").attr("src", "imgs/emoii.gif"),
                            $("#smile2").attr("src", "imgs/emoii.gif"),
                            $("#smile3").attr("src", "imgs/emoii.gif"),
                            $("#icon").attr("src", "imgs/icon.gif");
                        setTimeout(() => {
                            updateTimes();
                            updaterooms();
                        }, 500);
                        break;
                    case "noname":
                        lstat("warning", "هذا الإسم غير مسجل !");
                        break;
                    case "badname":
                        lstat("warning", "يرجى إختيار أسم آخر");
                        break;
                    case "usedname":
                        lstat("danger", "هذا الإسم مسجل من قبل");
                        break;
                    case "banduser":
                        lstat("danger", "تم حظرك من الدردشة");
                        break;
                    case "badpass":
                        lstat("warning", "كلمه المرور غير مناسبه");
                    case "wrong":
                        lstat("danger", "كلمه المرور غير صحيحه");
                        break;
                    case "vpn":
                        lstat("danger", "(vpn) تم حظر الدول الاجنبيه");
                        break;
                    case "reg":
                        lstat("success", "تم تسجيل العضويه بنجاح !");
                        $("#u2").val($("#u3").val());
                        $("#pass1").val($("#pass2").val());
                        login(2);
                        break;
                }
                break;
            case "powers":
                if (myid) {
                    powers = data;
                    for (var i = 0; i < powers.length; i++) {
                        var pname = powers[i].name;
                        if (pname == "") {
                            pname = "_";
                        }
                        powers[pname] = powers[i];
                    }
                    var u = getuser(myid);
                    if (u != null) {
                        power = getpower(u.power || "");
                        if (power.cp) {
                            $(".cp").show();
                        } else {
                            $(".cp").hide();
                        }
                        if (power.publicmsg > 0) {
                            $(".pmsg").show();
                        } else {
                            $(".pmsg").hide();
                        }
                        if (power.publicmsghide > 0) {
                            $(".pmsghide").show();
                        } else {
                            $(".pmsghide").hide();
                        }
                    }
                    for (var i = 0; i < users.length; i++) {
                        var e = users[i];
                        updateu(e.id, e);
                    }
                    needUpdate = true;
                }
                break;
            case "powers":
                powers = data;
                break;
            case "rops":
                var r = getroom(getuser(myid).roomid);
                r.ops = [];
                $.each(data, function (i, e) {
                    r.ops.push(e.lid);
                });
                break;
            case "power":
                if (myid) {
                    power = data;
                    if (power.cp) {
                        $(".cp").show();
                    } else {
                        $(".cp").hide();
                    }
                    if (power.publicmsg > 0) {
                        $(".pmsg").show();
                    } else {
                        $(".pmsg").hide();
                    }
                    if (power.publicmsghide > 0) {
                        $(".pmsghide").show();
                    } else {
                        $(".pmsghide").hide();
                    }
                    $.each(users, function (i, e) {
                        if (e.power == power.name || e.s != null) {
                            updateu(e.id, e);
                        }
                    });
                }
                break;
            case "not":
			    var not = $("#beep")[0];
                  $(".not").ready(function () { not.play() }); 
                if (data.user != null && data.force != 1 && nonot == true) {
                    SEND_EVENT_SEOHOST("nonot", {
                        id: data.user,
                    });
                    return;
                }
                var not = $($("#not").html()).first();
                var user = getuser(data.user);
                if (data.topic == "مراقبة") {
                    not.find("#isfil").text("مراقبة");
                } else if (data.topic == "ممنوعة") {
                    not.find("#isfil").text("ممنوعة");
                } else if (data.topic == "SHOWPROFILE") {
                    not.find("#isfil").text("البروفايل");
                } else if (data.topic == "إعجاب") {
                    not.find("#isfil").text("إعجاب");
                    if (islove) {
                        StartLove();
                    }
                } else {
                    not.find("#isfil").text("تنبيه");
                }

                if (user != null) {
                    if (ismuted(user)) {
                        return;
                    }
                    var uh = $('<div class="fl borderg corner uzr" style="width:100%;"></div>');
                    uh.append("<img src='" + user.pic + "' style='width:24px;height:24px;' class='corner borderg fl'>");
                    uh.append(
                        "<img class='u-ico fl ' style='max-height:18px;' > <div   style='max-width:80%;' class='dots nosel corner u-topic fl'>" +
                            user.topic +
                            '<span class="fr" style="color:grey;font-size:70%!important;">' +
                            user.idreg +
                            "</span>" +
                            "</div>"
                    );

                    uh.find(".u-topic").css({
                        "background-color": user.bg,
                        color: user.ucol,
                    });

                    var ico = getico(user);
                    if (ico != "") {
                        uh.find(".u-ico").attr("src", ico);
                    }
                    not.append(uh);
                }
                not.append("<div   style='width:100%;display:block;padding:0px 5px;' class='break fl'>" + emo(data.msg) + "</div>");
                not.css("margin-left", "+=" + notpos);
                notpos += 2;
                if (notpos >= 6) {
                    notpos = 0;
                }
                $(".dad").append(not);

                var notf = $($("#notf").html());
                var user = getuser(data.user);

                if (user != null) {
                    if (ismuted(user)) {
                        return;
                    }
                    var uh1 = $('<div onclick="upro(`' + user.id + '`);" class="notification seohost" style="width:100%;"></div>');
                    uh1.append('<p id="isfil" class="notification__title label bg-primary"></p> <br>');
                    uh1.append("<img src='" + user.pic + "' style='width:24px;height:24px;' class='corner borderg fl'>");
                    uh1.append("<img class='u-ico fl ' style='max-height:18px;' > <div   style='max-width:80%;' class='dots nosel corner u-topic fl'>" + user.topic + "</div>" + "<br>" + '<span class="seohost">' + emo(data.msg) + "</span>");
                    uh1.find(".u-topic").css({
                        "background-color": user.bg,
                        color: user.ucol,
                    });

                    var ico = getico(user);
                    if (ico != "") {
                        uh1.find(".u-ico").attr("src", ico);
                    }
                    if (data.topic == "مراقبة") {
                        uh1.find("#isfil").text("مراقبة");
                    } else if (data.topic == "ممنوعة") {
                        uh1.find("#isfil").text("ممنوعة");
                    } else if (data.topic == "SHOWPROFILE") {
                        uh1.find("#isfil").text("البروفايل");
                    } else {
                        uh1.find("#isfil").text("تنبيه");
                    }
                    $("#notficse").prepend(uh1);
                }

                break;
            case "delbc":
                if (myid) {
                    $(".bid" + data.bid).remove();
                }
                break;
            case "bclist":
                if (myid) {
                    $.each(data, function (i, e) {
                        AddMsg(".d2bc", e);
                    });
                }
                break;
            case "bc^":
                if (myid) {
                    if (data.likes) {
                        var islike = JSON.parse(data.likes);
                        for (var i = 1; i < 7; i++) {
                            var ee = $(".bid" + data.bid + " .like" + i);
                            if (ee.length > 0) {
                                if (filteredArray(islike, "state", i).length > 0) {
                                    ee.text(filteredArray(islike, "state", i).length);
                                }
                            }
                        }
                    }
                }
                break;
            case "story-":
                if (myid) {
                    $("#stories")
                        .find(".stid" + data)
                        .remove();
                    HideStory();
                }
                break;
            case "storyshows":
                if (myid) {
                    $("#stories")
                        .find(".stid" + data.id)
                        .attr("onclick", "ShowStory(" + JSON.stringify(data) + ");");
                }
                break;
            case "story":
                $(".img_str").attr("src", getuser(myid).pic);
                $.each(data, function (i, e) {
                    var hr = $(
                        '<div class="str stid' +
                            e.id +
                            '" style="text-align: center;margin-left: 5px;margin-top: 10px;width: 55px;">' +
                            '<div style=" width: 50px; height: 50px; background-color: rgb(243, 243, 243); background-position-y: 0%;border-radius:50%" class="fitimg u-pic borderg"></div>' +
                            '<div style="font-family: sans-serif;font-size: 10px !important;color: dimgray;">' +
                            e.topic +
                            "</div>" +
                            "</div>"
                    );
                    hr.attr("onclick", "ShowStory(" + JSON.stringify(e) + ");");

                    hr.find(".u-pic").css("background-image", 'url("' + e.pic + '")');
                    $("#stories").prepend(hr);
                });
                break;
            case "bcco":
                if (myid) {
                    allcooment[data.bid] = data.allcooment;

                    var exe = $("." + data.bid);
                    $(
                        '<div class="comentmsg fl" style="background: white ; box-shadow: 1px 2px 4px;border: 1px solid;width: 100%;padding: 2px;margin-bottom: -1px;"><span style="margin-top:2px;padding:0px 2px;margin-left:-20px;margin-right:4px;color:grey" class="fr minix tago" ago="' +
                            data.time +
                            '">الان</span><div class="fr" style="width: 87%;" ><span class="fr" style="width: 100%;">' +
                            data.topic +
                            '</span><span class="fr" style="color: #7e7c7c;width: 100%">' +
                            emo(data.pccus) +
                            '</span></div><img  src="' +
                            data.pic +
                            '" style="width: 30px;"></div>'
                    ).appendTo(exe);
                }
                var length = exe.find(".comentmsg").length;
                $(".coomentlengith" + data.bid).text(length);

                break;
            case "bc":
                if (myid) {
                    allcooment[data.bid] = data;
                    AddMsg(".d2bc", data);
                    if (data.numb == 1) {
                        if ($(".dpnl").is(":visible") == false || !$("#wall").hasClass("active")) {
                            bcc++;
                            hl($(".bwall").text(bcc).parent(), "warning");
                        }
                    }
                }
                break;
            case "ty":
                var v = $(".tbox" + data[0]);
                if (v.length) {
                    v = v.parent().parent().parent().find(".typ");
                    if (data[1] == 1) {
                        v.show();
                    } else {
                        v.hide();
                    }
                }
                break;
            case "pmf":
                if (myid) {
                    SEND_EVENT_SEOHOST("pm", {
                        msg: "",
                        link: data.file,
                        id: data.id,
                    });
                }
                break;
            case "pm":
                if (myid) {
                    if (ismuted(getuser(data.uid))) {
                        return;
                    }
                    if (data.force != 1 && nopm == true && $("#c" + data.pm).length == 0) {
                        SEND_EVENT_SEOHOST("nopm", {
                            id: data.uid,
                        });
                        return;
                    }
                    openw(data.pm, false);
                    AddMsg("#d2" + data.pm, data);
                    if (
                        (data.msg.includes("gif") ||
                            data.msg.includes("jpg") ||
                            data.msg.includes("jpeg") ||
                            data.msg.includes("tiff") ||
                            data.msg.includes("tif") ||
                            data.msg.includes("png") ||
                            data.msg.includes("webp") ||
                            data.msg.includes("bmp") ||
                            data.msg.includes("svg")) &&
                        data.msg.includes("emo/") == false
                    ) {
                        $("#c" + data.pm)
                            .find(".u-msg")
                            .html($("<div><i class='fa fa-picture-o'></i> " + "صورة" + "</div>"));
                    } else if (data.msg.includes("wav")) {
                        $("#c" + data.pm)
                            .find(".u-msg")
                            .html($("<div><i class='fa fa-microphone  '></i> " + "تسجيل صوتي" + "</div>"));
                    } else if (data.msg.includes("mov") || data.msg.includes("mp4") || data.msg.includes("webm") || data.msg.includes("3gpp")) {
                        $("#c" + data.pm)
                            .find(".u-msg")
                            .html($("<div><i class='fa fa-file-audio-o'></i> " + "مقطع فيديو" + "</div>"));
                    } else if (data.msg.includes("x-wav") || data.msg.includes("acc") || data.msg.includes("m4a") || data.msg.includes("mpeg") || data.msg.includes("mp3") || data.msg.includes("midi")) {
                        $("#c" + data.pm)
                            .find(".u-msg")
                            .html($("<div><i class='fa fa-file-video-o'></i> " + "مقطع صوت" + "</div>"));
                    } else {
                        $("#c" + data.pm)
                            .find(".u-msg")
                            .text(gettext($("<div>" + data.msg + "</div>")));
                    }
                    $("#c" + data.pm).insertAfter("#chats .chatsh");
                }
                break;
            case "ppmsg":
                if (myid) {
                    if (power.publicmsg == 0) {
                        return;
                    }
                    data.class = "ppmsgc";
                    var e = AddMsg("#d2", data);
                    e.find(".u-msg").append('<label style="margin-top:2px;color:blue" class="fl nosel fa fa-bullhorn">خاص</label>');
                }
                break;
            case "pmsg":
                if (myid) {
                    data.class = "pmsgc";
                    var e = AddMsg("#d2", data);
                    e.find(".u-msg").append('<label style="margin-top:2px;color:blue" class="fl nosel fa fa-bullhorn">إعلان</label>');
                }
                break;
			case "clearR":
        $("#room > #d2 ").html("");

        if (myid) {
          data.class = "pmsgc";
          var e = MsgAdd("#d2", data);
          e.find(".u-msg").append('<label style="margin-top:2px;color:blue" class="fl nosel fa fa-trash">النظـام   |ㅤ</label>');
        }
                break;
            case "pmsghide":
                if (myid) {
                    var not = $($("#not").html()).first();
                    not.find("#isfil").text("إعلان مهم");
                    var uh = $('<div class="fl borderg corner uzr" style="width:100%;"></div>');
                    uh.append("<img src='" + data.pic + "' style='width:24px;height:24px;' class='corner borderg fl'>");
                    uh.append("<img class='u-ico fl ' style='max-height:18px;' > <div   style='max-width:80%;' class='dots nosel corner u-topic fl'>" + data.topic + "</div>");
                    uh.find(".u-topic").css({
                        "background-color": data.bg,
                        color: data.ucol,
                    });

                    not.append(uh);
                    not.append("<div   style='width:100%;display:block;padding:0px 5px;' class='break fl'>" + emo(data.msg) + "</div>");
                    not.css("margin-left", "+=" + notpos);
                    notpos += 2;
                    if (notpos >= 6) {
                        notpos = 0;
                    }
                    $(".dad").append(not);
                    var notf = $($("#notf").html());

                    var uh1 = $('<div onclick="upro(`' + data.id + '`);" class="notification seohost" style="width:100%;"></div>');
                    uh1.append('<p id="isfil" class="notification__title label bg-primary"></p> <br>');
                    uh1.append("<img src='" + data.pic + "' style='width:24px;height:24px;' class='corner borderg fl'>");
                    uh1.append("<img class='u-ico fl ' style='max-height:18px;' > <div   style='max-width:80%;' class='dots nosel corner u-topic fl'>" + data.topic + "</div>" + "<br>" + '<span class="seohost">' + emo(data.msg) + "</span>");
                    uh1.find(".u-topic").css({
                        "background-color": data.bg,
                        color: data.ucol,
                    });

                    uh1.find("p#isfil").text("إعلان مهم");

                    $("#notficse").prepend(uh1);
                }
                break;
            case "ppmsghide":
                if (myid) {
                    if (power.publicmsg == 0) {
                        return;
                    }
                    var not = $($("#not").html()).first();

                    not.find("#isfil").text("إعلان مهم للسوابر");

                    var uh = $('<div class="fl borderg corner uzr" style="width:100%;"></div>');
                    uh.append("<img src='" + data.pic + "' style='width:24px;height:24px;' class='corner borderg fl'>");
                    uh.append("<img class='u-ico fl ' style='max-height:18px;' > <div   style='max-width:80%;' class='dots nosel corner u-topic fl'>" + data.topic + "</div>");
                    uh.find(".u-topic").css({
                        "background-color": data.bg,
                        color: data.ucol,
                    });

                    not.append(uh);
                    not.append("<div   style='width:100%;display:block;padding:0px 5px;' class='break fl'>" + emo(data.msg) + "</div>");
                    not.css("margin-left", "+=" + notpos);
                    notpos += 2;
                    if (notpos >= 6) {
                        notpos = 0;
                    }
                    $(".dad").append(not);
                    var notf = $($("#notf").html());

                    var uh1 = $('<div onclick="upro(`' + data.id + '`);" class="notification seohost" style="width:100%;"></div>');
                    uh1.append('<p id="isfil" class="notification__title label bg-primary"></p> <br>');
                    uh1.append("<img src='" + data.pic + "' style='width:24px;height:24px;' class='corner borderg fl'>");
                    uh1.append("<img class='u-ico fl ' style='max-height:18px;' > <div   style='max-width:80%;' class='dots nosel corner u-topic fl'>" + data.topic + "</div>" + "<br>" + '<span class="seohost">' + emo(data.msg) + "</span>");
                    uh1.find(".u-topic").css({
                        "background-color": data.bg,
                        color: data.ucol,
                    });

                    uh1.find("p#isfil").text("إعلان مهم للسوابر");

                    $("#notficse").prepend(uh1);
                }
                break;
            case "lvel":
                if (myid) {
                    data.class = "pmsgc";
                    var e = AddMsg("#d2", data);
                    e.find(".u-msg").append('<label style="margin-top:2px;color:blue" class="fl nosel fa fa-star">ترقة</label>');
                }
                new Audio("/imgs/win.mp3").play();
                break;
            case "microp":
                istalkmicro = data;
                break;
            case "muted":
                if (myid) {
                    muteit(getuser(data.uid));
                    if (data.ism == true) {
                        $("#tbox").css("background-color", "#AAAAAF");
                    } else {
                        $("#tbox").css("background-color", "#FFFFFF");
                    }
                }
                break;
            case "msg":
                if (myid) {
                    var u = getuser(data.uid || "");
                    if (u != null && ismuted(u)) {
                        return;
                    }
                    AddMsg("#d2", data);
                    break;
                }
            case "likemsg":
                if (myid) {
                    const islikemsg = msglist.findIndex((x) => x.mi == data.mi);
                    if (islikemsg != -1) {
                        const islikemsgs = msglist[islikemsg]["like"].findIndex((x) => x == data.id);
                        if (islikemsgs == -1) {
                            msglist[islikemsg].like.push(data.id);
                        }
                        $(".mi" + data.mi)
                            .find(".islikemsg > span")
                            .text(msglist[islikemsg].like.length);
                    } else {
                        $(".mi" + data.mi)
                            .find(".islikemsg > span")
                            .text(0);
                    }
                }
                break;
            case "delmsg":
                if (myid) {
                    $(".mi" + data).remove();
                }
                break;
            case "close":
                $(".ovr div").attr("class", "bg-danger").find("div").text("..");
                close();
                break;
            case "ev":
                eval(data);
                break;
            case "ulist":
                if (myid) {
                    users = data;
                    $(".busers").text(
                        $.grep(users, function (e) {
                            return e.s == null;
                        }).length
                    );
                    $.each(users, function (i, e) {
                        ucach[e.id] = e;
                        AddUser(e.id, e);
                    });
                }
                break;

            case "u-":
                if (myid) {
                    if (ux[data]) {
                        ux[data].remove();
                    }
                    delete ucach[data];
                    delete ux[data];
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].id == data) {
                            users.splice(i, 1);
                            break;
                        }
                    }
                    wclose(data);
                    $(".busers").text(
                        $.grep(users, function (e) {
                            return e.s == null;
                        }).length
                    );
                }

                break;
            case "u+":
                if (myid) {
                    var ou = getuserbylid(data.lid);
                    if (ou != null) {
                        ondata("u-", ou.id);
                    }
                    ucach[data.id] = data;
                    users.push(data);
                    AddUser(data.id, data);
                    updateu(data.id, data);
                    needUpdate = true;
                    $(".busers").text(
                        $.grep(users, function (e) {
                            return e.s == null;
                        }).length
                    );
                }
                break;
            case "ur":
                if (myid) {
                    var uid = data[0],
                        roomid = data[1];
                    var r = getroom(roomid);
                    var u = getuser(uid);
                    if (u == null) {
                        console.error("ur", data);
                        return;
                    }
                    var orid = u.roomid;
                    var oroom = getroom(orid);
                    var changed = uid == myid || roomid == myroom || orid == myroom;
                    if (uid == myid) {
                        myroom = roomid;
                    }
                    if (u != null) {
                        if (myroom == roomid && (!r || !r.broadcast)) {
                            $(".broadcasters").html("");
                            istalkromm = false;
                            $(".broadcasters").attr("style", "width: 100%;border: none;padding: 0;height: 0;");
                            $("#d2").css("padding-top", "0px");
                        }
                        u.roomid = roomid;
                        if (uid == myid) {
                            needUpdate = true;
                            // setTimeout(function() {
                            //     $('label[data-target="#users"]').click();
                            // }, 600);
                            $("#users .inroom").removeClass("inroom");
                            $("#rooms .inroom").removeClass("inroom");
                            $("#rooms .bord").removeClass("bord");
                            if (r != null) {
                                $("#tbox").css("background-color", "");
                                $("#rooms .r" + roomid).addClass("bord");
                                $(".ninr,.rout").show();
                                if (r.owner == u.lid || power.roomowner == true) {
                                    $(".redit").show();
                                } else {
                                    $(".redit").hide();
                                }
                                var nulled = false;
                                for (var i = 0; i < users.length; i++) {
                                    var e = users[i];
                                    if (ux[e.id] == null) {
                                    } else if (e.roomid == roomid) {
                                        ux[e.id].addClass("inroom");
                                    }
                                }
                                if (nulled) {
                                }
                            } else {
                                $(".ninr,.rout,.redit").hide();
                                $("#tbox").css("background-color", "#AAAAAF");
                            }
                        } else {
                            if (changed) {
                                needUpdate = true;
                                if (roomid == myroom && myroom != null) {
                                    ux[uid].addClass("inroom");
                                } else {
                                    ux[uid].removeClass("inroom");
                                }
                            }
                        }
                        if (r != null) {
                            needSort = true;
                            var ht = $("#rooms .r" + r.id);
                            var ru = $.grep(rusers(r.id), function (e) {
                                return e.s == null;
                            });
                            ht.find(".uc")
                                .text(ru.length + "/" + r.max)
                                .attr("v", ru.length);
                            ht.attr("v", ru.length);
                        }
                        if (oroom != null) {
                            needSort = true;
                            var ht = $("#rooms .r" + orid);
                            var ru = $.grep(rusers(orid), function (e) {
                                return e.s == null;
                            });
                            ht.find(".uc")
                                .text(ru.length + "/" + oroom.max)
                                .attr("v", ru.length);
                            ht.attr("v", ru.length);
                        }
                    }
                }
                break;
            case "u^":
                if (myid) {
                    if (users == null) {
                        return;
                    }
                    if (ux[data.id] == null) {
                        return;
                    }
                    Object.assign(ucach[data.id], data);
                    if (Object.keys(data).length == 1 && data.rep != null) {
                        return;
                    }
                    var ou = getuser(data.id);
                    updateu(data.id, ou);
                    if (ou.topic != data.topic || ou.power != data.power || ou.roomid != data.roomid) {
                        needUpdate = true;
                    }
                }
                break;
            case "r^":
                if (myid) {
                    if (data.id == myroom) {
                        data.ops = getroom(myroom).ops;
                    }
                    var or = getroom(data.id);
                    rcach[data.id] = data;
                    rooms = $.grep(rooms, function (value) {
                        return value.id != data.id;
                    });
                    if (or.topic != data.topic) {
                        needUpdate = true;
                    }
                    rooms.push(data);
                    updater(data);
                }
                break;
            case "rlist":
                if (myid) {
                    rooms = data;
                    $.each(rooms, function (i, e) {
                        rcach[e.id] = e;
                        addroom(e);
                    });
                }
                break;
            case "r+":
                if (myid) {
                    rcach[data.id] = data;
                    rooms.push(data);
                    addroom(data);
                }
                break;
            case "r-":
                if (myid) {
                    delete rcach[data];
                    $(".r" + data).remove();
                    rooms = $.grep(rooms, function (value) {
                        return value.id != data;
                    });
                }
                break;
            case "donecall":
                hl($(".callstat").text("متصل .!"), "success");
                break;
            case "calling":
                var u2 = getuser(data.caller);
                if (ismuted(getuser(data.uid))) {
                    return;
                }
                if (nopm == true && $("#c" + data.caller).length == 0) {
                    SEND_EVENT_SEOHOST("nopm", {
                        id: data.caller,
                    });
                    SEND_EVENT_SEOHOST("calldeny", data);
                    hangupu();
                }
                if (local_stream == null && $(".callnot").length == 0 && u2 != null && $("#d2" + data.caller).length > 0) {
                    var h = $($("#callnot").html());
                    var uh = $($("#uhtml").html());
                    uh.find(".u-msg").remove();
                    uh.find(".u-topic").html(u2.topic).css({
                        color: u2.ucol,
                        "background-color": u2.bg,
                    });
                    uh.find(".u-pic")
                        .css("background-image", 'url("' + u2.pic + '")')
                        .css({
                            width: "24px",
                            height: "24px",
                        });
                    h.find(".uzer").append(uh);
                    h.addClass(u2.id);
                    h.addClass("callnot");
                    // h.draggable({
                    //     containment: "body",
                    //     scroll: false
                    // });
                    callid = data.caller;
                    h.attr("callid", data.roomid);
                    h.find(".calldeny").click(function (params) {
                        h.remove();
                        SEND_EVENT_SEOHOST("calldeny", data);
                        hangupu();
                    });
                    h.find(".callaccept").click(function (params) {
                        callstat = 1;
                        $(document.body).append(h);
                        Callanswer(data.roomid, data.caller);
                        $(this).hide();
                    });
                    $("#d2" + data.caller).append(h);
                    hl($(".callstat").text(""), "warning");
                    updateu(u2.id);
                    openw(data.pm, false);
                } else {
                    SEND_EVENT_SEOHOST("calldeny", data);
                }
                break;
            case "callaccept":
                var h = $(".callnot");
                var u2 = getuser(data.caller);
                if (h.attr("callid") == data.roomid && (u2 != null) & (local_stream == null)) {
                } else {
                    SEND_EVENT_SEOHOST("calldeny", data);
                }
                break;
            case "calldeny":
                hangupu();
                if (data.state == 2) {
                    hl($(".callstat").text("تم إالغاء المكالمة"), "danger");
                }
                setTimeout(function () {
                    $(".callnot").remove();
                    hl($(".callstat").text(".."), "warning");
                }, 1000);
                break;
            case "callend":
                $(".callnot").remove();
                break;
        }
    } catch (ero) {
        console.error(ero.stack);
        if (getUrlParameter("debug") == "1") {
            alert(cmd + "\n" + ero.stack);
        }
    }
}
var notpos = 0;
function gettext(d) {
    $.each(d.find("img"), function (i, e) {
        var alt = $(e).attr("alt");
        if (alt != null) {
            $("<x>" + alt + "</x>").insertAfter($(e));
        }
        $(e).remove();
    });
    return $(d).text();
}
function login(i) {
    $("#tlogins button").attr("disabled", "true");
    switch (i) {
        case 1:
            SEND_EVENT_SEOHOST("g", {
                username: $("#u1").val(),
                gh: gh,
                ss: ccode(),
                refr: getv("refr"),
                r: getv("r"),
            });
            setv("u1", encode($("#u1").val()));
            setv("isl", "no");
            break;
        case 2:
            SEND_EVENT_SEOHOST("login", {
                username: $("#u2").val(),
                stealth: $("#stealth").is(":checked"),
                password: $("#pass1").val(),
                gh: gh,
                ss: ccode(),
                refr: getv("refr"),
                r: getv("r"),
            });
            setv("u2", encode($("#u2").val()));
            setv("p1", encode($("#pass1").val()));
            setv("isl", "yes");
            break;
        case 3:
            SEND_EVENT_SEOHOST("reg", {
                username: $("#u3").val(),
                password: $("#pass2").val(),
                gh: gh,
                ss: ccode(),
                refr: getv("refr"),
                r: getv("r"),
            });
            break;
    }
}
function hl(e, stat) {
    e = $(e);
    var type = "";
    if (e.hasClass("label")) {
        type = "bg";
    }
    if (e.hasClass("btn")) {
        type = "btn";
    }
    if (e.hasClass("panel")) {
        type = "panel";
    }
    $(e).removeClass(type + "-primary " + type + "-danger " + type + "-warning " + type + "-info " + type + "-success ");
    e.addClass(type + "-" + stat);
    return e;
}
function lstat(stat, msg) {
    hl(".loginstat", stat).text(msg);
}
function setprofile() {
    var d = {};
    d.topic = $(".stopic").val();
    d.msg = $(".smsg").val();
    d.ucol = "#" + $(".scolor").val().split("#").join("");
    d.mcol = "#" + $(".mcolor").val().split("#").join("");
    d.bg = "#" + $(".sbg").val().split("#").join("");
    var u = getuser(myid);
    d.pic = u.pic;
    d.username = u.username;
    setv("uprofile", JSON.stringify(d));
    SEND_EVENT_SEOHOST("setprofile", d);
}
function loadprofile() {
    var d = getv("uprofile");
    if (d == "") {
        return null;
    }
    try {
        return JSON.parse(getv("uprofile"));
    } catch (er) {
        return null;
    }
}
function AddUser(id, user) {
    var u = $(uhtml);
    if ($(".uid" + id).length) {
        return;
    }
    var ico = getico(user);
    if (ico != "") {
        u.find(".u-ico").attr("src", ico);
    }
    u.addClass("uid" + id);
    u.addClass("hid");
    u.attr("onclick", `upro('${user.id}');`);
    $("#users").append(u);
    ux[id] = $(".uid" + id);
}
function updateu(id, uuu) {
    var u = uuu || getuser(id);
    if (u == null) {
        return;
    }
    var ico = getico(u);
    var stat = "imgs/s" + u.stat + ".png?2";
    if (u.s) {
        stat = "imgs/s4.png?2";
    }
    if (u.id == myid) {
        $(".spic").css("background-image", 'url("' + u.pic + '")');
        $(".stopic").val(gettext($("<div>" + u.topic + "</div>")));
        $(".smsg").val(gettext($("<div>" + u.msg + "</div>")));
        $(".scolor").val(u.ucol).css("background-color", u.ucol).trigger("change");
        $(".mcolor")
            .val(u.mcol || "#000")
            .css("background-color", u.mcol || "#000");
        $(".sbg").val(u.bg).css("background-color", u.bg);
    }
    if (u.msg == "") {
        u.msg = "..";
    }
    var uh = ux[id];
    uh.find(".ustat").attr("src", stat);
    if (u.co == "--" || u.co == null || u.co == "A1" || u.co == "A2" || u.co == "EU") {
        uh.find(".co").remove();
    } else {
        uh.find(".co").attr("src", "flag/" + (u.co.toLowerCase().replace("il", "ps") || "tn") + ".png");
    }
    if(u.ifedit){
        uh.css("background","url("+getuser(u.id).back+") 0% 0% / 100% 100% rgba(255, 255, 255, 0.05)")
        if(getuser(u.id).atar == "" || getuser(u.id).atar == " "){
            uh.find(".imgbaqer").css("display","none")
            uh.find(".ustat").css("height","57px")
            uh.find(".u-pic").attr("style",`min-height: 54px; max-height: 62px; margin-left: 1px; min-width: 48px; width: 56px;`)
        }else{
            uh.find(".imgbaqer").css("background-image","url("+getuser(u.id).atar+")")
            uh.find(".imgbaqer").css("display","")
            uh.find(".u-pic").attr("style",`border-radius: 50% !important; margin-top: 9px !important; margin-left: -70px !important; background-size: 100% 100%; width: 60px !important; height: 60px !IMPORTANT;`)
            uh.find(".ustat").css("height","83px")
        }
    }else{
        uh.find(".imgbaqer").css("display","none")
        uh.find(".u-pic").attr("style",`min-height: 54px; max-height: 62px; margin-left: 1px; min-width: 48px; width: 56px;`)
    }
    if (ismuted(u)) {
        uh.find(".muted").toggleClass("fa-ban", true);
    } else {
        uh.find(".muted").toggleClass("fa-ban", false);
    }
    if (u.meiut) {
        uh.find(".muteds").toggleClass("fa-ban", true);
    } else {
        uh.find(".muteds").toggleClass("fa-ban", false);
    }
    uh.attr("v", getpower(u.power).rank);
    if (ico != "") {
        uh.find(".u-ico").attr("src", ico);
    } else {
        uh.find(".u-ico").removeAttr("src");
    }
    uh.find(".uhash").text(u.idreg);
    uh.find(".u-topic").html(u.topic).css({
        "background-color": u.bg,
        color: u.ucol,
    });
    uh.find(".u-msg").html(emo(u.msg));
    uh.find(".u-pic").attr("src", u.pic);
    uh = $("#c" + id);
    if (uh.length) {
        if (ico != "") {
            uh.find(".u-ico").attr("src", ico);
        }
        uh.find(".ustat").attr("src", stat);
        uh.find(".u-topic").html(u.topic).css({
            "background-color": u.bg,
            color: u.ucol,
        });
        uh.find(".u-pic").attr("src", u.pic);
        uh = $(".w" + id).find(".head .uzr");
        uh.find(".ustat").attr("src", stat);
        if (ico != "") {
            uh.find(".u-ico").attr("src", ico);
        }
    }
    stealthit(u);
    return;
}
var needUpdate = false;
var lastus = "";
function usearch() {
    if ($("#usearch").val() != lastus) {
        lastus = $("#usearch").val();
        if (lastus != "") {
            $("#usearch").removeClass("bg");
        } else {
            $("#usearch").addClass("bg");
        }
        $("#users .uzr").css("display", "");
        $.each(
            $.grep(users, function (value) {
                return value.topic.split("ـ").join("").toLowerCase().indexOf(lastus.split("ـ").join("").toLowerCase()) == -1 && value.idreg.indexOf(lastus) != 0 && value.idreg.indexOf(lastus) != 1;
            }),
            function (i, e) {
                ux[e.id].css("display", "none");
            }
        );
    }
    setTimeout(function () {
        usearch();
    }, 600);
}
usearch();
function updateusers() {
    if (needUpdate == false) {
        return;
    }
    $("#users")
        .find(".uzr")
        .sort(function (a, b) {
            var av = parseInt($(a).attr("v") || 0);
            var bv = parseInt($(b).attr("v") || 0);
            if ($(a).hasClass("inroom")) {
                av += 100000;
            }
            if ($(b).hasClass("inroom")) {
                bv += 100000;
            }

            if ($(a).hasClass("ninr")) {
                av += 9999;
            }
            if ($(b).hasClass("ninr")) {
                bv += 9999;
            }

            if (av == bv) {
                return ($(a).find(".u-topic").text() + "").localeCompare($(b).find(".u-topic").text() + "");
            }

            return av < bv ? 1 : -1;
        });
    $.each(
        $.grep(users, function (e) {
            return e.s != null;
        }),
        function (i, e) {
            stealthit(e);
        }
    );
}
function sendpm(d) {
    if (ismuted(getuser(d.data.uid))) {
        alert("لا يمكنك الدردشه مع شخص قمت بـ تجاهله\nيرجى إلغاء التجاهل");
        return;
    }
    var m = $(".tbox" + d.data.uid).val();
    $(".tbox" + d.data.uid).val("");
    $(".tbox" + d.data.uid).focus();
    if (m == "%0A" || m == "%0a" || m == "" || m == "\n") {
        return;
    }
    SEND_EVENT_SEOHOST("pm", {
        msg: toEnglishDigits(m),
        id: d.data.uid,
    });
}
function pmsg1() {
    var ht = $("#mnot");
    ht.find(".rsave")
        .show()
        .off()
        .click(function () {
            ht.modal("hide");
            var m = ht.find("textarea").val();
            if (m == "" || m == null) {
                return;
            }
            m = m.split("\n").join(" ");
            if (m == "%0A" || m == "%0a" || m == "" || m == "\n") {
                return;
            }
            if (ht.find(".ispp").is(":checked")) {
                SEND_EVENT_SEOHOST("ppmsghide", {
                    msg: m,
                });
            } else {
                SEND_EVENT_SEOHOST("pmsghide", {
                    msg: m,
                });
            }
        });
    ht.modal({
        backdrop: "modal",
        title: "ffff",
    });
    if (power.publicmsg == 0) {
        ht.find(".ispp").attr("disabled", true).prop("checked", false);
    } else {
        ht.find(".ispp").attr("disabled", false).prop("checked", false);
    }
    ht.find("textarea").val("");
}
function pmsg() {
    var ht = $("#mnot");
    ht.find(".rsave")
        .show()
        .off()
        .click(function () {
            ht.modal("hide");
            var m = ht.find("textarea").val();
            if (m == "" || m == null) {
                return;
            }
            m = m.split("\n").join(" ");
            if (m == "%0A" || m == "%0a" || m == "" || m == "\n") {
                return;
            }
            if (ht.find(".ispp").is(":checked")) {
                SEND_EVENT_SEOHOST("ppmsg", {
                    msg: m,
                });
            } else {
                SEND_EVENT_SEOHOST("pmsg", {
                    msg: m,
                });
            }
        });
    ht.modal({
        backdrop: "modal",
        title: "ffff",
    });
    if (power.publicmsg == 0) {
        ht.find(".ispp").attr("disabled", true).prop("checked", false);
    } else {
        ht.find(".ispp").attr("disabled", false).prop("checked", false);
    }
    ht.find("textarea").val("");
}
function TSEND_EVENT_SEOHOST() {
    var m = $("#tbox").val().split("\n").join("");
    $("#tbox").val("");
    $("#tbox").focus();
    if (m == "%0A" || m == "%0a" || m == "" || m == "\n") {
        return;
    }
    SEND_EVENT_SEOHOST("msg", {
        msg: toEnglishDigits(m),
        reply: isreplydone,
    });
    norpl();
}
function getpower(n) {
    var pname = n;
    if (pname == "") {
        pname = "_";
    }
    if (powers[pname] != null) {
        return powers[pname];
    }
    for (var i = 0; i < powers.length; i++) {
        if (powers[i].name == n) {
            return powers[i];
        }
    }
    var p = JSON.parse(JSON.stringify(powers[0]));
    var pkeys = Object.keys(p);
    for (var i = 0; i < pkeys.length; i++) {
        switch (true) {
            case typeof p[pkeys[i]] == "number":
                p[pkeys[i]] = 0;
                break;
            case typeof p[pkeys[i]] == "string":
                p[pkeys[i]] = "";
                break;
            case typeof p[pkeys[i]] == "boolean":
                p[pkeys[i]] = false;
                break;
        }
    }
    return p;
}
function getico(u) {
    if (u.ico != null && u.ico != "" && u.ico.includes("sico")) {
        return u.ico;
    }
    var ico = "";
    ico = (
        getpower(u.power) || {
            ico: "",
        }
    ).ico;
    if (ico != "") {
        ico = "sico/" + ico;
    }
    if (ico == "" && (u.ico || "") != "" && u.ico.includes("dro3")) {
        ico = u.ico;
    }
    return ico;
}
function stealthit(u) {
    if (ux[u.id] == null) {
        return;
    }
    var power2 = getpower(u.power);
    if (u.s && power2.rank > power.rank) {
        ux[u.id].addClass("hid");
    } else {
        ux[u.id].removeClass("hid");
    }
}
var uhtml = "*";
var rhtml = "*";
function rjoin(rid) {
    istalkromm = false;
    var pwd = "";
    if (getroom(rid).needpass) {
        pwd = prompt("كلمه المرور؟", "");
        if (pwd == "") {
            return;
        }
    }
    SEND_EVENT_SEOHOST("rjoin", {
        id: rid,
        pwd: pwd,
    });
}
function rjoinAdmin(rid, pass) {
    if (getroom(rid).needpass) {
        SEND_EVENT_SEOHOST("rjoin", {
            id: rid,
            pwd: pass,
        });
    } else {
        rjoin(rid);
    }
}
var umsg = "*";
function emo(data) {
    for (i = 0; i < 5; i++) {
        data = ekstra.reduce((acc, item, i) => {
            const regex = new RegExp("(^| )" + item + "( |$|\n)");
            return acc.replace(regex, '$1<img class="smile" src="' + emos[i] + '"/>$1');
        }, data);
    }
    return data;
}
function updateTimes() {
    $.each($(".tago"), function (i, e) {
        if ($(e).attr("ago") == null) {
            $(e).attr("ago", new Date().getTime());
        } else {
            $(e).html(agoo(parseInt($(e).attr("ago"))));
        }
    });
    setTimeout(function () {
        updateTimes();
    }, 15000);
    prs();
}
function agoo(d) {
    var dd = new Date().getTime() - d;
    var v = Math.abs(dd) / 1000;
    if (v < 59) {
        ("الآن");
    }
    v = v / 60;
    if (v < 59) {
        return parseInt(v) + "د";
    }
    v = v / 60;
    if (v < 24) {
        return parseInt(v) + "س";
    }
    v = v / 24;
    if (v < 30) {
        return parseInt(v) + "ي";
    }
    v = v / 30;
    return parseInt(v) + "ش";
}
function ytVidId(url) {
    var p = /(?:\s+)?(?:^)?(?:https?:\/\/)?(?:http?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(\s+|$)/;
    return url.match(p) ? [RegExp.$1.split("<").join("&#x3C;").split("'").join("").split('"').join("").split("&").join(""), RegExp.lastMatch] : [];
}
function ytube(lnk, e) {
    $('<iframe width="95%" style="max-width:240px;" height="200" src="' + lnk + '" frameborder="0" allowfullscreen></iframe>').insertAfter($(e));
    $(e).remove();
}
function filteredArray(arr, key, value) {
    const newArray = [];
    for (i = 0, l = arr.length; i < l; i++) {
        if (arr[i][key] == value) {
            newArray.push(arr[i]);
        }
    }
    return newArray;
}
function norpl() {
    const reply = $(".isreply");
    reply.html("");
    reply.css("display", "none");
    fixSize();
    isreplydone = null;
}
function replaymsg(data) {
    isreplydone = data;
    const reply = $(".isreply");
    reply.css("display", "block");
    reply.html(
        '<div onclick="norpl()" class="item2 fa fa-close" style="color:#fff;position: absolute;padding: 18px;font-size: 20px !important;background:rgba(220,0,0,0.8)"></div>' +
            '<div class="grid-container">' +
            '<div class="item3">' +
            data.topic +
            "</div>" +
            '<div class="item5" style="text-align:right">' +
            data.msg +
            "</div>" +
            "</div>"
    );
    fixSize();
}
function StartLove() {
    var love = setInterval(function () {
        var r_num = Math.floor(Math.random() * 40) + 1;
        var r_size = Math.floor(Math.random() * 65) + 10;
        var r_left = Math.floor(Math.random() * 60) + 1;
        var r_bg = Math.floor(Math.random() * 25) + 100;
        var r_time = Math.floor(Math.random() * 5) + 5;
        $("#d2").append(
            "<div class='heart' style='width:" +
                r_size +
                "px;height:" +
                r_size +
                "px;left:" +
                r_left +
                "%;background:rgba(255," +
                (r_bg - 25) +
                "," +
                r_bg +
                ",1);-webkit-animation:love " +
                r_time +
                "s ease;-moz-animation:love " +
                r_time +
                "s ease;-ms-animation:love " +
                r_time +
                "s ease;animation:love " +
                r_time +
                "s ease'></div>"
        );
        $("#d2").append(
            "<div class='heart' style='width:" +
                (r_size - 10) +
                "px;height:" +
                (r_size - 10) +
                "px;left:" +
                (r_left + r_num) +
                "%;background:rgba(255," +
                (r_bg - 25) +
                "," +
                (r_bg + 25) +
                ",1);-webkit-animation:love " +
                (r_time + 5) +
                "s ease;-moz-animation:love " +
                (r_time + 5) +
                "s ease;-ms-animation:love " +
                (r_time + 5) +
                "s ease;animation:love " +
                (r_time + 5) +
                "s ease'></div>"
        );
        $(".heart").each(function () {
            var top = $(this)
                .css("top")
                .replace(/[^-\d\.]/g, "");
            var width = $(this)
                .css("width")
                .replace(/[^-\d\.]/g, "");
            if (top <= -100 || width >= 150) {
                $(this).detach();
            }
        });
    }, 500);
    setTimeout(function () {
        $("#d2").find(".heart").remove();
        clearInterval(love);
    }, 5000);
}
var msglist = [];
function MOVE_PROGRASE(data) {
    $(".loadstory").show();
    if (data.type.includes("video")) {
        $("#st_v_p").one("loadeddata", function () {
            $(".loadstory").hide();
            $(".st_v")[0].play();
            timest = setInterval(() => {
                framest();
            }, data.time * 10);
        });
    } else {
        $("#st_p_t").one("load", function (e) {
            $(".loadstory").hide();
            timest = setInterval(() => {
                framest();
            }, data.time * 10);
        });
    }
}
function framest() {
    if (widthst >= 100) {
        clearInterval(timest);
        HideStory();
    } else {
        widthst++;
        $(".brsy").css("width", widthst + "%");
    }
}
function HideStory() {
    $("#StoryPanel").hide();
    $(".st_v")[0].pause();
    clearInterval(timest);
    widthst = 1;
    $(".brsy").css("width", "0%");
}
function ShowStory(data) {
    updateTimes();
    var u = getuser(myid);
    STORY_DEFALUT = { id: data.id };
    SEND_EVENT_SEOHOST("showstory", { id: data.id, showstory: u.idreg });
    if (data.type == "video") {
        $(".st_p").hide();
        $(".st_v").show();
        $(".storyplay,.storymuted").show();
        $(".st_v").attr("src", data.video);
    } else {
        $(".storyplay,.storymuted").hide();
        $(".st_v").hide();
        $(".st_p").show();
        $(".st_p").css("background-image", "url(" + data.video + ")");
        $("#st_p_t").attr("src", data.video);
    }
    $(".st_time").attr("ago", data.data);
    $(".st_topic").text(data.topic);
    $(".st_pic").attr("src", data.pic);
    $("#StoryPanel").show();
    MOVE_PROGRASE({ type: data.type, time: data.time });

    var pw = getpower(u.power);
    if (data.lid == u.lid || pw.delmsg) {
        $(".supstory").show();
    } else {
        $(".supstory").hide();
    }
    if (data.lid == u.lid) {
        const views = data.showstory ? JSON.parse(data.showstory) : [];
        $(".st_view").text(views.length + ": مشاهدة");
    } else {
        $(".st_view").text("");
    }
}
function AddMsg(wid, data) {
    var msg = $(umsg);
    var u = getuser(data.uid);
    msg.find(".showmsg").hide();
    msg.find(".u-pic").attr("onclick", `upro('${data.uid}');`).attr("src", data.pic);
    msg.find(".tago").attr("ago", data.data);
    msg.find(".u-topic").html(data.topic).css("color", data.ucol);
    // if( wid != ".d2bc"){
    // msg.find(".u-topic").addClass(u.lid+"name");
    // msg.find(".u-pic").addClass(u.lid+"img");
    // msg.find(".u-msg").addClass(u.lid+"msgs");
    // }else{
    //     msg.find(".u-topic").addClass(data.lid+"name");
    //     msg.find(".u-pic").addClass(data.lid+"img");
    //     msg.find(".u-msg").addClass(data.lid+"msgs");
    // }
    if (data.reply) {
        msg.css("background", "aliceblue");
        msg.find(".u-rply").css("display", "block");
        msg.find(".u-rply").html(
            '<div class="grid-container" style="margin-left:0px;border-radius:0px;border-left:4px solid cornflowerblue">' +
                '<div class="item3" style="text-align:left">' +
                data.reply.topic +
                "</div>" +
                '<div class="item5" style="text-align:left">' +
                data.reply.msg +
                "</div>" +
                '<hr style="margin:0;"></div>'
        );
    }
    setTimeout(() => {
        emopop(".emo" + data.id);
    }, 1000);
    if (wid != "#d2" && wid != ".d2bc") {
        if (data.uid == myid) {
            msg.find(".showmsg").show();
            msg.find(".showmsg").find("#seobaqershowmsg").hide();
        }
    }
    data.msg = emo(data.msg);

    var yt = ytVidId(data.msg.replace(/\n/g, ""));
    if (yt.length > 1 && wid != "#d2") {
        data.msg = data.msg.replace(
            yt[1],
            "<button onclick='ytube(\"https://www.youtube.com/embed/" +
                yt[0] +
                "\",this);' style='font-size: 20px !important;width: 100%;max-width: 300px;padding: 10px !important;border: none;border-radius: 8px !important;background-color: #ff5353 ;color: #fff;display: flex;justify-content: space-evenly;box-shadow: 0 4px 8px rgba(0,0,0,0.2);transition: background-color 0.3s, box-shadow 0.3s;align-items: center;' class='btn fa fa-youtube'><img style='padding: 5px;width: 60px;height: 60px;border-radius: 50%;' alt='[YouTube]' onerror='$(this).parent().remove();' src='https://img.youtube.com/vi/" +
                yt[0] +
                "/0.jpg' >YouTube</button>"
        );
    }

    msg.find(".u-msg").html(emo(data.msg)).css("color", data.mcol);

    if (data.class != null) {
        msg.addClass(data.class);
    }
    msg.addClass("mm");

    if (u != null) {
        var ico = getico(u);
        if (ico != "") {
            msg.find(".u-ico").attr("src", ico);
        }
        msg.find(".u-topic").css({
            color: u.ucol,
            "background-color": u.bg,
        });
    } else {
        msg.find(".u-ico").remove();
        msg.find(".u-topic").css({
            color: data.ucol || "#000",
            "background-color": data.bg || "",
        });
    }
    var isbc = wid == ".d2bc";
    if (data.bid != null) {
        msg.find(".uzr").css("width", "78%");
        msg.css({
            width: "100%",
        });
        msg.addClass("bid" + data.bid);
        if (data.bcc) {
            var vxsa = JSON.parse(data.bcc);
        } else {
            var vxsa = data.bcc;
        }
        if (data.likes) {
            var liks = JSON.parse(data.likes);
        } else {
            var liks = data.likes;
        }
        if (power.delbc || data.lid == getuser(myid).lid) {
            msg.append(
                "<a id='remove' onclick=\"SEND_EVENT_SEOHOST('delbc',{bid:'" + data.bid + '\'})" style="color: white;padding: 4px;margin-left: 2px;" class="btn minix btn-primary fa fa-times ' + (dbcb == false ? "fl" : "fr") + '">&nbsp;</a>'
            );
        }

        msg.append("<a id='like' onclick=\"SEND_EVENT_SEOHOST('likebc',{state:2,bid:'" + data.bid + '\'})" style="color: white;padding: 4px; margin-right: 2px;" class="like2 btn minix btn-danger fa fa-heart fr">&nbsp;</a>');
        if (cooment == true) {
            msg.append(`<a  onclick="cooments('` + data.bid + `');" style="color: white;padding: 4px; margin-right: 0px;" class="btn minix btn-primary fa fa-comment fr coomentlengith` + data.bid + `">` + vxsa.length || 0 + `</a>`);
        }
    }
    if (data.mi != null) {
        msglist.push({
            mi: data.mi,
            like: [],
        });
        msg.addClass("mi" + data.mi);
        const iksm = msglist.findIndex((x) => x.mi == data.mi);
        if (iksm != -1) {
        } else {
        }
        if (power.delmsg) {
            msg.append(
                "<button style='display: flex; margin-top: 25px; height: 25px;' onclick=\"SEND_EVENT_SEOHOST('delmsg', {mi:'" +
                    data.mi +
                    '\',topic:$(this).parent().find(\'.u-topic\').text()});" style="" class="btn minix btn-primary fa fa-times fr">&nbsp;</button>'
            );
        }
        // if (!data.reply && isrepl) {
        //     // msg.find.append("<button onclick=\"replaymsg({id:'" + data.mi + '\',msg:$(this).parent().find(\'.u-msg\').text(),topic:$(this).parent().find(\'.u-topic\').text()});" style="" class="btn minix btn-primary fa fa-reply fr">&nbsp;</button>');
        // }
    }
    var w = $(wid);
    if (isbc == true) {
        msg.prependTo(w);
    } else {
        msg.appendTo(w);
    }
    $.each(msg.find("a.uplink"), function (i, e) {
        var lnk = $(e).attr("href") || "";
        var mim = mime[lnk.split(".").pop().toLowerCase()] || "";
        if (mim.match(/image/i)) {
            var ob = $("<img style='max-width:240px;max-height:200px;' src='" + lnk + "' class='hand fitimg'  onclick=showphoto('" + lnk + "') >");
            ob.insertAfter(e);
            $(e).remove();
        }
        if (mim.match(/video/i)) {
            var ob = $('<button class="btn fa fa-play" style="width: 100%;height: 100%;display: flex;border-radius: 15px !important;border: 1px solid #ffffff;font-size: 25px !important;flex-direction: row;align-items: center;"><video class="" src="' + lnk + '" style="width:100%;height: 100px;border-radius: 15px !important;" src=""></button>');
            ob.insertAfter(e);
            $(e).remove();
            ob.click(function () {
                $("<video style='width:95%;max-height:200px;'  controls autoplay><source src='" + lnk + "'></video>").insertAfter(ob);
                ob.remove();
            });
        }
        if (mim.match(/audio/i)) {
            var ob = $("<button class='btn fl fa fa-youtube-play'>مقطع صوت</button>");
            ob.insertAfter(e);
            $(e).remove();
            ob.click(function () {
                $("<audio style='width:100%;' controls><source src='" + lnk + "' type='audio/mpeg'></audio>").insertAfter(ob);
                ob.remove();
            });
        }
    });
    if (isbc == true) {
        if (w.find(".mm").length >= 100) {
            $(wid + " .mm")
                .last()
                .remove();
        }
        if (w[0].scrollTop == 0) {
            w.scrollTop(msg.innerHeight());
        }
        w.stop().animate(
            {
                scrollTop: 0,
            },
            200
        );
    } else {
        if (w.find(".mm").length >= 20) {
            $(wid + " .mm")
                .first()
                .remove();
        }
        if (wid != "#d2") {
            w.stop().animate(
                {
                    scrollTop: w[0].scrollHeight,
                },
                150
            );
        } else {
            w.stop().animate(
                {
                    scrollTop: w[0].scrollHeight,
                },
                150
            );
        }
    }
    return msg;
}
function showphoto(src) {
    $("body").append(
        `<div style="width:100%;height:100%;z-index:999999;position: fixed;left: 0px;top: 0px;background-color: rgba(0, 0, 0, 0.6);background-size:contain;background-image:url(` +
            src +
            `);background-repeat: no-repeat;background-position: center;" onclick="$(this).remove();"></div>`
    );
}
var isclose = false;
function gift(id, dr3) {
    SEND_EVENT_SEOHOST("action", {
        cmd: "gift",
        id: id,
        gift: dr3,
    });
}
function ubnr(id, bnr) {
    if (bnr == null) {
        return;
    }
    if (bnr == "") {
        SEND_EVENT_SEOHOST("bnr-", {
            u2: id,
        });
    } else {
        SEND_EVENT_SEOHOST("bnr", {
            u2: id,
            bnr: bnr,
        });
    }
}
function cooments(id) {
    sd = getcooment(id);
    if (sd.bcc) {
        var vxsa = JSON.parse(sd.bcc);
    } else {
        var vxsa = sd.bcc;
    }
    var ht = $("#cooment");
    ht.find(".rplaymsg").attr("class", "break flex-grow-1 r rplaymsg " + sd.bid);
    ht.find(".rplaymsg").children().remove();
    ht.modal();
    $.each(vxsa, function (i, e) {
        var mmm = $(
            '<div class="comentmsg fl" style="background: white ; box-shadow: 1px 2px 4px;border: 1px solid;width: 100%;padding: 2px;margin-bottom: -1px;" class="fl"><span style="margin-top:2px;padding:0px 2px;margin-left:-20px;margin-right:4px;color:grey" class="fr minix tago" ago="' +
                e.time +
                '">الان</span><div class="fr" style="width: 87%;" ><span class="fr" style="width: 100%;">' +
                e.topic +
                '</span><span class="fr" style="color: #7e7c7c;width: 100%">' +
                emo(e.pccus) +
                '</span></div><img  src="' +
                e.pic +
                '" style="width: 30px;"></div>'
        );
        ht.find(".rplaymsg").append(mmm);
    });
    ht.find(".emo").addClass("emo" + id);
    setTimeout(() => {
        ht.find(".rplaymsg").scrollTop(5000000000000000000000000000);
    }, 100);
    ht.find(".sndpm").attr(
        "onclick",
        "SEND_EVENT_SEOHOST('sco',{bid:'" + sd.bid + "',c:$(this).parent().children('textarea').val()} );$(this).parent().children('textarea').val('');setTimeout(() => {$('.rplaymsg').scrollTop(500000000000000000000000000)}, 150);"
    );
    ht.find("#rmsg").children().remove();
    ht.find("#rmsg").append(
        `<div class="uzr d-flex mm bidlbyqx6b700" style="border-bottom: 1px solid lavender; margin: 0px; width: 100%; padding: 0px 0px 0px 2px;">
     <div style="min-width: 48px; width: 48px; height: 46px; background-image: url(` +
            sd.pic +
            `); background-position-y: 0%;" class="fitimg u-pic borderg" onclick="upro('` +
            sd.lid +
            `');">
     </div>
     <div class="uzr flex-fill break" style="padding-top: 1px;padding-left:1px;">
       <div style="width:100%;display: flex;height: 21px;" class="d-flex">
        <div class="d-flex flex-grow-1" style="overflow: hidden;">
         <span style="padding: 1px 4px; display: block; margin-left: 1px; border-radius: 2px; color: ` +
            sd.ucol +
            `" class="nosel u-topic dots hand">` +
            sd.topic +
            `</span></div>
       </div>
       <div style="padding: 0px 1px 1px 5px; width: 100%; color: ` +
            sd.mcol +
            `" class="u-msg break">` +
            sd.msg +
            `<div class="d-flex fr" style="max-width: 92px;height: 21px;">
     </div>
   </div>`
    );
    $.each(ht.find("a.uplink"), function (i, e) {
        var lnk = $(e).attr("href") || "";
        var mim = mime[lnk.split(".").pop().toLowerCase()] || "";
        if (mim.match(/image/i)) {
            var ob = $("<img style='max-width:240px;max-height:200px;' src='" + lnk + "' class='hand fitimg'  onclick=showphoto('" + lnk + "') >");
            ob.insertAfter(e);
            $(e).remove();
        }
        if (mim.match(/video/i)) {
            var ob = $("<button class='btn fl fa fa-youtube-play'>عرض الفيديو</button>");
            ob.insertAfter(e);
            $(e).remove();
            ob.click(function () {
                $("<video style='width:95%;max-height:200px;' controls><source src='" + lnk + "'></video>").insertAfter(ob);
                ob.remove();
            });
        }
        if (mim.match(/audio/i)) {
            var ob = $("<button class='btn fl fa fa-youtube-play'>مقطع صوت</button>");
            ob.insertAfter(e);
            $(e).remove();
            ob.click(function () {
                $("<audio style='width:100%;' controls><source src='" + lnk + "' type='audio/mpeg'></audio>").insertAfter(ob);
                ob.remove();
            });
        }
    });
    emopop(".emo" + id);
    updateTimes();
}
function close(i) {
    if (isclose) {
        return;
    }
    isclose = true;
    window.onbeforeunload = null;
    prs();
    setTimeout('prs();location.href="/";', i || 3000);
    lstat("info", "يتم إعاده الإتصال");
}
function loadblocked() {
    var d = getv("blocklist");
    if (d != null && d != "") {
        try {
            d = JSON.parse(d);
            if (Array.isArray(d)) {
                blocked = d;
            }
        } catch (er) {}
    }
}
function saveblocked() {
    var d = JSON.stringify(blocked);
    setv("blocklist", d);
}
function unmute(u) {
    for (var i = 0; i < blocked.length; i++) {
        var bl = blocked[i];
        if (bl.lid == u.lid) {
            blocked.splice(i, 1);
            updateu(u.id);
        }
    }
    saveblocked();
}
function muteit(u) {
    if (u.id == myid) {
        return;
    }
    for (var i = 0; i < blocked.length; i++) {
        var bl = blocked[i];
        if (bl.lid == u.lid) {
            return;
        }
    }
    blocked.push({
        lid: u.lid,
    });
    updateu(u.id);
    saveblocked();
}
function ismuted(u) {
    for (var i = 0; i < blocked.length; i++) {
        var bl = blocked[i];
        if (bl.lid == u.lid) {
            return true;
        }
    }
    return false;
}
Number.prototype.time = function () {
    var t = this;
    var d = 0;
    var h = 0;
    var m = 0;
    var s = 0;
    var ret = "";
    d = parseInt(t / (1000 * 60 * 60 * 24));
    t = t - parseInt(1000 * 60 * 60 * 24 * d);
    h = parseInt(t / (1000 * 60 * 60));
    t = t - parseInt(1000 * 60 * 60 * h);
    m = parseInt(t / (1000 * 60));
    t = t - parseInt(1000 * 60 * m);
    s = parseInt(t / 1000);
    if (h > 9) {
        ret += h + ":";
    } else {
        ret += "0" + h + ":";
    }
    if (m > 9) {
        ret += m + ":";
    } else {
        ret += "0" + m + ":";
    }
    if (s > 9) {
        ret += s;
    } else {
        ret += "0" + s;
    }
    return ret;
};
var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
function abbreviateNumber(number) {
    var tier = (Math.log10(Math.abs(number)) / 3) | 0;
    if (tier == 0) return number;
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    return scaled.toFixed(1) + suffix;
}

function upro(id) {
    var rowner = power.roomowner;
    var u = getuser(id);
    if (u == null) {
        return;
    }
    if (u.s && getpower(u.power).rank > power.rank) {
        return;
    }
    var ht = $("#upro");

    var upic = u.pic.split(".");
    if (u.pic.split("/").pop().split(".").length > 2) {
        upic.splice(upic.length - 1, 1);
    }
    var upic2 = u.afterpic.split(".");
    if (u.afterpic.split("/").pop().split(".").length > 2) {
        upic2.splice(upic2.length - 1, 1);
    }
    ht.find(".star").html("");
    ht.find(".timetoday").text();
    ht.find(".pointtop").text();
    istogladmin = true;
    $(".isadmin").hide();
    $(".notadmin").show();
    $("#myadmin").text("أدوات إداريه");
    if (u.evaluation >= 0 && u.evaluation < 2000) {
        ht.find(".star").html('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
    } else if (u.evaluation >= 2000 && u.evaluation < 4000) {
        ht.find(".star").html('<i class="fa fa-star" style="color:orange"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
    } else if (u.evaluation >= 4000 && u.evaluation < 6000) {
        ht.find(".star").html('<i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
    } else if (u.evaluation >= 6000 && u.evaluation < 8000) {
        ht.find(".star").html('<i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
    } else if (u.evaluation >= 8000 && u.evaluation < 10000) {
        ht.find(".star").html(
            '<i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i><i class="fa fa-star"></i>'
        );
    } else if (u.evaluation > 10000) {
        ht.find(".star").html(
            '<i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i><i class="fa fa-star" style="color:orange"></i>'
        );
    }
    ht.find(".u-pic")
        .css("background-image", 'url("' + upic.join(".") + '")')
        .removeClass("fitimg")
        .addClass("fitimg");
        ht.find(".aftar")
        .css("background-image", 'url("' + upic2.join(".") + '")')
        .removeClass("fitimg")
        .addClass("fitimg");
    ht.find(".u-pic").attr("onclick", "showphoto('" + upic.join(".") + "')");
    ht.find(".aftar").attr("onclick", "showphoto('" + upic2.join(".") + "')");
        // if (u.time != null) {
        //     ht.find(".timetoday").text(new Date(new Date().getTime() - u.time).getTime().time() + " : التواجد");
        // }
    ht.find(".pointtop").text(u.evaluation + " : النقاط");
    ht.find(".u-msg").html(emo(u.msg));
    if (uf[(u.co || "").toLocaleLowerCase()] != null) {
        ht.find(".u-co")
            .text(uf[u.co.toLocaleLowerCase()])
            .append('<img class="fl" src="flag/' + (u.co.toLowerCase().replace("il", "ps") || "tn") + '.png">');
    } else {
        ht.find(".u-co").text("--");
    }
    var ico = getico(u);
    var rtxt = "بدون غرفه";
    var room = getroom(u.roomid);
    if (power.unick == true || (power.mynick == true && id == myid)) {
        $(".u-topic").val(u.topic);
        $("#myadmin").show();
        ht.find(".nickbox").show();
        ht.find(".u-nickc")
            .off()
            .click(function () {
                SEND_EVENT_SEOHOST("unick", {
                    id: id,
                    nick: ht.find(".u-topic").val(),
                });
            });
    } else {
        ht.find(".nickbox").hide();
    }
    if (power.loveu) {
        ht.find(".roomzbox").show();
        $("#myadmin").show();
        ht.find(".rpwd").val("");
        var pba = ht.find(".roomz");
        pba.empty();
        for (var i = 0; i < rooms.length; i++) {
            var hh = $("<option></option>");
            hh.attr("value", rooms[i].id);
            if (rooms[i].id == myroom) {
                hh.css("color", "blue");
                hh.attr("selected", "true");
            }
            hh.text(
                "[" +
                    $("#rooms .r" + rooms[i].id)
                        .attr("v")
                        .padStart(2, "0") +
                    "]" +
                    rooms[i].topic
            );
            pba.append(hh);
        }
        var options = $("#rooms .roomz option");
        var arr = options
            .map(function (_, o) {
                return {
                    t: $(o).text(),
                    v: o.value,
                };
            })
            .get();
        arr.sort(function (o1, o2) {
            var t1 = o1.t.toLowerCase(),
                t2 = o2.t.toLowerCase();
            return t1 > t2 ? -1 : t1 < t2 ? 1 : 0;
        });
        ht.find(".uroomz")
            .off()
            .click(function () {
                SEND_EVENT_SEOHOST("action", {
                    cmd: "rinvite",
                    id: id,
                    rid: pba.val(),
                    pwd: ht.find(".rpwd").val(),
                });
            });
    } else {
        ht.find(".roomzbox").hide();
    }
    if (power.ulike) {
        $("#myadmin").show();
        ht.find(".likebox").show();
        ht.find(".likebox .likec").val(u.rep);
        ht.find(".ulikec")
            .off()
            .click(function () {
                var likes = parseInt(ht.find(".likebox .likec").val()) || 0;
                SEND_EVENT_SEOHOST("setLikes", {
                    id: u.id,
                    likes: likes,
                });
            });
    } else {
        ht.find(".likebox").hide();
    }
    if (power.unick) {
        ht.find(".msgbox").show();
        $("#myadmin").show();
        ht.find(".msgbox .usmsg").val(u.msg);
        ht.find(".usmsgs")
            .off()
            .click(function () {
                var msgs = ht.find(".msgbox .usmsg").val();
                SEND_EVENT_SEOHOST("setMsg", {
                    id: u.id,
                    msg: msgs,
                });
            });
    } else {
        ht.find(".msgbox").hide();
    }
    if (power.setpower) {
        powers = powers.sort(function (a, b) {
            return b.rank - a.rank;
        });
        ht.find(".powerbox").show();
        $("#myadmin").show();
        var pb = ht.find(".userpower");
        pb.empty();
        pb.append("<option></option>");
        for (var i = 0; i < powers.length; i++) {
            var hh = $("<option></option>");
            if (powers[i].rank > power.rank) {
                hh = $("<option style='display:none'></option>");
            }
            hh.attr("value", powers[i].name);
            if (powers[i].name == u.power) {
                hh.css("color", "blue");
                hh.attr("selected", "true");
            }
            hh.text("[" + powers[i].rank + "] " + powers[i].name);
            pb.append(hh);
        }
        ht.find(".powerbox .userdays").val(0);
        ht.find(".upower")
            .off()
            .click(function () {
                var days = parseInt(ht.find(".userdays").val()) || 0;
                $.get("cp.nd?cmd=setpower&token=" + token + "&id=" + u.idreg.split("#")[1] + "&power=" + pb.val() + "&days=" + days, function (d) {
                    var jq = JSON.parse(d);
                    if (jq.err == true) {
                        alert(jq.msg);
                    } else {
                        alert("تم ترقيه العضو");
                        SEND_EVENT_SEOHOST("setpoweron", {
                            id: u.id,
                            power: pb.val(),
                        });
                    }
                });
            });
    } else {
        ht.find(".powerbox").hide();
    }
    if (room != null) {
        if (room.ops != null) {
            if (room.ops.indexOf(getuser(myid).lid) != -1 || room.owner == getuser(myid).lid || power.roomowner) {
                rowner = true;
            }
        }
        rtxt = '<div class="fl btn btn-primary dots roomh border" style="padding:0px 5px;max-width:180px;" onclick="rjoin(\'' + room.id + '\')"><img style="max-width:24px;" src=\'' + room.pic + "'>" + room.topic + "</div>";
        ht.find(".u-room").html(rtxt);
        ht.find(".u-room").show();
    } else {
        ht.find(".u-room").hide();
    }
    if (rowner) {
        ht.find(".urkick,.umod").show();
    } else {
        ht.find(".urkick,.umod").hide();
    }
    if (ismuted(u)) {
        ht.find(".umute").hide();
        ht.find(".uunmute").show();
    } else {
        ht.find(".umute").show();
        ht.find(".uunmute").hide();
    }
    if (power.setpower != true) {
        ht.find(".ubnr").hide();
        ht.find(".uphoto").hide();
    } else {
        ht.find(".ubnr").show();
        ht.find(".uphoto").show();
    }
    if (power.history != true) {
        ht.find(".uh").hide();
    } else {
        ht.find(".uh").show();
    }
    if (power.kick < 1) {
        ht.find(".ukick").hide();
        ht.find(".udelpic").hide();
    } else {
        ht.find(".ukick").show();
        ht.find(".udelpic").show();
    }
    if (!power.ban) {
        ht.find(".uban").hide();
    } else {
        ht.find(".uban").show();
    }
    if (power.upgrades < 1) {
        ht.find(".ugift").hide();
    } else {
        ht.find(".ugift").show();
    }
    if (!power.meiut) {
        ht.find(".meiut").hide();
    } else {
        ht.find(".meiut").show();
    }
    ht.find(".uh")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");

            $.get("uh?token=" + token + "&u2=" + id, "&u1=" + myid, function (d) {
                if (typeof d != "object") {
                    alert("لايمكنك القيام بهذه العملية");
                } else {
                    ht.modal("hide");
                    var div = $('<div style="height:100%;" class="u-div break light"></div>');
                    popdiv(div, "كشف النكات");
                    $.each(d, function (i, e) {
                        var dd = $("<div class='borderg nackname'></div>");
                        dd.append($("<div class='value-kshf '><span class='reveal_names__item__key'>العضو</span><span class='username'></span></div>"));
                        dd.append($("<div class='value-kshf '><span class='reveal_names__item__key'>الزخرفة</span><span class='topic'></span></div>"));
                        dd.append($("<div class='value-kshf '><span class='reveal_names__item__key'>الايبي</span><span class='ip'></span></div>"));
                        dd.append($("<div class='value-kshf '><span class='reveal_names__item__key'>الجهاز</span><span class='fp'></span></div>"));
                        dd.find(".username").text(e.username);
                        dd.find(".topic").text(e.topic);
                        dd.find(".ip").text(e.ip);
                        dd.find(".fp").text(e.fp);
                        div.prepend(dd);
                    });
                }
            });
        });
    ht.find(".umute")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");
            muteit(u);
            ht.find(".umute").hide();
            ht.find(".uunmute").show();
        });
    ht.find(".uunmute")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");
            unmute(u);
            ht.find(".umute").show();
            ht.find(".uunmute").hide();
        });
    ht.find(".umod")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");
            SEND_EVENT_SEOHOST("op+", {
                lid: u.lid,
            });
        });
    ht.find(".ulike")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");
            SEND_EVENT_SEOHOST("action", {
                cmd: "like",
                id: id,
            });
        })
        .text(abbreviateNumber(u.rep || 0) + "");
    ht.find(".ureport")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");
            var s = prompt("اكتب رسالتك", "");
            if (s == null || s == "") {
                return;
            }
            SEND_EVENT_SEOHOST("action", {
                cmd: "report",
                id: id,
                msg: s,
            });
        });
    ht.find(".ukick")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");
            SEND_EVENT_SEOHOST("action", {
                cmd: "kick",
                id: id,
            });
            ht.modal("hide");
        });
    ht.find(".udelpic")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");
            SEND_EVENT_SEOHOST("action", {
                cmd: "delpic",
                id: id,
            });
        });
    ht.find(".urkick")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");
            SEND_EVENT_SEOHOST("action", {
                cmd: "roomkick",
                id: id,
            });
            ht.modal("hide");
        });
    ht.find(".meiut")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this)
                .css("background-color", "indianred")
                .text(!u.meiut ? "الغاء الاسكات" : "اسكات");
            SEND_EVENT_SEOHOST("action", {
                cmd: "meiut",
                id: id,
            });
            ht.modal("hide");
        });
    if (u.meiut) {
        $(".meiut").css("background-color", "indianred").text("الغاء الاسكات");
    } else {
        $(".meiut").css("background-color", "").text("اسكات");
    }
    ht.find(".uban")
        .css("background-color", "")
        .off()
        .click(function () {
            $(this).css("background-color", "indianred");
            SEND_EVENT_SEOHOST("action", {
                cmd: "ban",
                id: id,
            });
            ht.modal("hide");
        });
    ht.find(".unot")
        .css("background-color", "")
        .off()
        .click(function () {
            var m = prompt("اكتب رسالتك", "");
            if (m == null || m == "") {
                return;
            }
            $(this).css("background-color", "indianred");
            SEND_EVENT_SEOHOST("action", {
                cmd: "not",
                id: id,
                msg: m,
            });
        });
    ht.find(".ugift")
        .popover("hide")
        .css("background-color", "")
        .off()
        .click(function () {
            var dd = $(".gifts_picker__contianer");
            dd.children().remove();
            $(".gifts_picker").show();
            $.each(dro3, function (i, e) {
                dd.append("<img style='padding:5px;margin:4px;max-width:160px;max-height:40px;' class='btn hand borderg corner' src='dro3/" + e + "' onclick=gift('" + id + "','" + e + "');$('.gifts_picker').hide()>");
            });
            $(".gifts_picker__contianer__clear").attr("onclick", "gift('" + id + "','');$('.gifts_picker').hide()");
        });
    ht.find(".ubnr")
        .css("background-color", "")
        .off()
        .click(function () {
            var dd = $(".gifts_picker__contianer");
            $(".gifts_picker").show();
            dd.children().remove();
            $.each(sico, function (i, e) {
                dd.append("<img style='padding:5px;margin:4px;max-width:160px;max-height:40px;' class='btn hand borderg corner' src='sico/" + e + "' onclick=ubnr('" + id + "','" + e + "');$('.gifts_picker').hide()>");
            });
            $(".gifts_picker__contianer__clear").attr("onclick", "ubnr('" + id + "','');$('.gifts_picker').hide()");
        });

    ht.modal({
        backdrop: "modal",
    });
    var uico = "";
    if (ico != "") {
        uico = '<img class="fl u-ico"  alt="" src="' + ico + '">';
    }
    ht.find(".modal-title").html("<img style='width:18px;height:18px;float:left;' src='" + u.pic + "'>" + uico + u.topic);
    ht.find(".upm")
        .off()
        .click(function () {
            ht.modal("hide");
            openw(id, true);
        });

    fixSize(1);
}
function atar(){
    $("#atar").empty();
    $.each(photoup, function(i, e) {
                $("#atar").append(`<img src='photoup/` + e + `' onclick='addback("photoup/`+e+`",`+2+`)'>`);
            });
            $("#back").empty();
            $.each(back, function(i, e) {
                        $("#back").append(`<img src='back/` + e + `' onclick='addback("back/`+e+`",`+1+`)'>`);
                    });
}
function popdiv(div, title) {
    if ($("#uh").length) {
        $("#uh").parent().parent().remove();
    }
    newpop(title, div);
}
function newpop(title, body) {
    var p = $($("#pop").html());
    p.find(".title").append(title);
    p.find(".pphide").addClass("phide");
    p.find(".body").append(body);
    $(".dad").append(p);
    p.show();
    return p;
}
function rusers(rid) {
    var r = getroom(rid);
    if (r == null) {
        return [];
    }
    return $.grep(users, function (e) {
        return e.roomid == rid;
    });
}
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split("&");
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] == sParam) {
            return ("" + decodeURIComponent(sParameterName[1])).split("<").join("&#x3C;");
        }
    }
}
function ChangePassword() {
    var ChangePass = prompt("الرجاء إدخال كلمة المرور الجديدة");
    if (ChangePass != null) {
        SEND_EVENT_SEOHOST("chpass", {
            pass: ChangePass,
        });
    }
}
function addback(data,num) {
  SEND_EVENT_SEOHOST("cheangback", {
            back: data,
            num:num
});
}
function mkr() {
    $("#ops").children().remove();
    var ht = $("#mkr");
    ht.find(".rsave").hide();
    ht.find(".rdelete").hide();
    ht.find(".modal-title").text("إنشاء غرفه جديدة");
    ht.modal({
        backdrop: "modal",
    });
    $("button#nopic").click();
    ht.find(".rtopic").val("");
    ht.find(".rabout").val("");
    ht.find(".rpwd").val("");
    ht.find(".picroom").attr("onclick", "sendpicroom();");
    ht.find(".rwelcome").val("");
    ht.find(".rmax").val("");
    ht.find(".rlike").val("");
    ht.find(".micnumber").val("");
    ht.find(".rdel").prop("checked", false).parent().show();
    ht.find(".broadcast").prop("checked", false).parent().show();
    ht.find(".rmake")
        .show()
        .off()
        .click(function () {
            if (ht.find(".rtopic").val().trim().length <= 0) return alert("لا يمكن ترك اسم الغرفة فارغاً ");
            if (ht.find(".rabout").val().trim().length <= 0) return alert("لا يمكن ترك وصف الغرفة فارغاً ");
            if (ht.find(".rwelcome").val().trim().length <= 0) return alert("لا يمكن ترك  رسالة الترحيب فارغا");
            if (ht.find(".rmax").val().trim().length <= 0) return alert("الرجاء اختيار عدد");
            SEND_EVENT_SEOHOST("r+", {
                topic: ht.find(".rtopic").val(),
                about: ht.find(".rabout").val(),
                welcome: ht.find(".rwelcome").val(),
                pass: ht.find(".rpwd").val(),
                max: ht.find(".rmax").val(),
                like: ht.find(".rlike").val(),
                delete: ht.find(".rdel").prop("checked"),
                broadcast: ht.find(".broadcast").prop("checked"),
                mic: ht.find(".micnumber").val(),
                pic: ht.find(".picroom").attr("src"),
                color: ht.find(".colorrooms").attr("value"),
            });
            ht.modal("hide");
        });
}

function redit(e) {
    $("#ops").children().remove();
    if (e == null) {
        e = myroom;
    }
    var r = getroom(e);
    if (r == null) {
        return;
    }
    var ht = $("#mkr");
    ht.find(".modal-title").text("إداره الغرفه");
    ht.find(".rsave")
        .show()
        .off()
        .click(function () {
            if (ht.find(".rtopic").val().trim().length <= 0) return alert("لا يمكن ترك اسم الغرفة فارغاً ");
            if (ht.find(".rabout").val().trim().length <= 0) return alert("لا يمكن ترك وصف الغرفة فارغاً ");
            if (ht.find(".rwelcome").val().trim().length <= 0) return alert("لا يمكن ترك  رسالة الترحيب فارغا");
            if (ht.find(".rmax").val().trim().length <= 0) return alert("الرجاء اختيار عدد");
            SEND_EVENT_SEOHOST("r^", {
                id: e,
                topic: ht.find(".rtopic").val(),
                about: ht.find(".rabout").val(),
                welcome: ht.find(".rwelcome").val(),
                broadcast: ht.find(".broadcast").prop("checked"),
                pass: ht.find(".rpwd").val(),
                max: ht.find(".rmax").val(),
                like: ht.find(".rlike").val(),
                mic: ht.find(".micnumber").val(),
                pic: ht.find(".picroom").attr("src"),
                color: ht.find(".colorrooms").attr("value"),
            });
            ht.modal("hide");
        });

    ht.find(".rdelete")
        .show()
        .off()
        .click(function () {
            SEND_EVENT_SEOHOST("r-", {
                id: e,
            });
            ht.modal("hide");
        });
    ht.modal({
        backdrop: "modal",
        title: "ffff",
    });
    ht.find(".rpwd").val("");
    ht.find(".rtopic").val(r.topic);
    ht.find(".rabout").val(r.about);
    ht.find(".rwelcome").val(r.welcome);
    ht.find(".broadcast").prop("checked", r.broadcast);
    ht.find(".rmax").val(r.max);
    ht.find(".rlike").val(r.rmli);
    ht.find(".colorrooms").attr("value", r.color).css("background-color", r.color),
        setTimeout(function () {
            ht.find(".picroom").attr("src", r.pic);
        }, 50);
    ht.find(".picroom").attr("onclick", "sendpicroom('" + r.id + "');");
    ht.find(".rmake").hide();
    ht.find(".rdel").parent().hide();
    SEND_EVENT_SEOHOST("ops", {});
}
function updaterooms() {
    if (needUpdate == false) {
        return;
    }
    var u = getuser(myid);
    if (u == null) {
        return;
    }
    $("#rroomm").attr("title", "غرف الدردشه:" + rooms.length + "");
    $.each(rooms, function (i, e) {
        var ht = $(".r" + e.id);
        if (e.owner == (u.lid || "")) {
            ht.css("background-color", "snow");
        }
        var ru = $.grep(rusers(e.id), function (e) {
            return e.s == null;
        });
        ht.find(".uc")
            .html(ru.length + "/" + e.max)
            .attr("v", ru.length);
        ht.attr("v", ru.length);
    });
}
function updater(r) {
    var ht = $(".r" + r.id);
    ht.find(".u-pic").attr("src", r.pic + "?1");
    ht.find(".u-pic").attr("onclick", "showphoto('" + r.pic + "')");
    ht.find(".u-topic").text(r.topic).css("color", r.color);
    ht.find(".u-msg").text(r.about);

    if (r.broadcast) {
        if (ht.find(".istoa").length == 0) {
            ht.find(".uc").removeClass("fa-user");
            ht.find(".uc").addClass("fa-microphone");
            ht.find(".uc").removeClass("bg-primary");
            ht.find(".uc").addClass("bg-danger");
        }
    } else {
        $(".r" + r.id + ">span.istoa").remove();
        ht.find(".uc").removeClass("fa-microphone");
        ht.find(".uc").addClass("fa-user");
        ht.find(".uc").removeClass("");
        ht.find(".uc").addClass("bg-primary");
        $(".broadcasters").html("");
        istalkromm = false;
        $(".broadcasters").attr("style", "width: 100%;border: none;padding: 0;height: ;");
        $("#d2").css("padding-top", "0px");
    }
    if (r.needpass) {
        ht.find(".u-topic").prepend('<img src="imgs/lock.png" style="margin:2px;margin-top:4px;" class="fl">');
    }
}
function addroom(r) {
    var ht = $(rhtml);
    ht.addClass("r" + r.id);
    ht.attr("onclick", "rjoin('" + r.id + "');");
    var ru = $.grep(rusers(r.id), function (e) {
        return e.s == null;
    });
    ht.find(".uc")
        .text(ru.length + "/" + r.max)
        .attr("v", ru.length);
    ht.attr("v", ru.length);
    $("#rooms").append(ht);
    updater(r);
}
function getuserbylid(id) {
    return $.grep(users, function (value) {
        return value.lid == id;
    })[0];
}
function getuserbyname(username) {
    return $.grep(users, function (value) {
        return value.username == username;
    })[0];
}
function getuser(id) {
    return ucach[id];
}
function getcooment(id) {
    return allcooment[id];
}
function getroom(id) {
    return rcach[id];
}
function wclose(id) {
    $("#c" + id).remove();
    $(".w" + id).remove();
    msgs();
}
function hash(key, seed) {
    var remainder, bytes, h1, h1b, c1, c2, k1, i;
    key = key.join("");
    remainder = key.length & 3;
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;
    while (i < bytes) {
        k1 = (key.charCodeAt(i) & 0xff) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 36) | ((key.charCodeAt(++i) & 0xff) << 24);
        ++i;
        k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 36) * c1) & 0xffff) << 36)) & 0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 36) * c2) & 0xffff) << 36)) & 0xffffffff;
        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 36) * 5) & 0xffff) << 36)) & 0xffffffff;
        h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 36) + 0xe654) & 0xffff) << 36);
    }
    k1 = 0;
    switch (remainder) {
        case 3:
            k1 ^= (key.charCodeAt(i + 2) & 0xff) << 36;
        case 2:
            k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
        case 1:
            k1 ^= key.charCodeAt(i) & 0xff;
            k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 36) * c1) & 0xffff) << 36)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 36) * c2) & 0xffff) << 36)) & 0xffffffff;
            h1 ^= k1;
    }
    h1 ^= key.length;
    h1 ^= h1 >>> 36;
    h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 36) * 0x85ebca6b) & 0xffff) << 36)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 36) * 0xc2b2ae35) & 0xffff) << 36)) & 0xffffffff;
    h1 ^= h1 >>> 36;
    return (h1 >>> 0).toString(36);
}
function ccode() {
    try {
        var c = Math.ceil(new Date().getTime() / (1000 * 60 * 90)).toString(36);
        c = c + c.split("").reverse().join("");
        if (getv("sx") != "") {
            c = getv("sx");
        } else {
            setv("sx", c);
        }
        return c;
    } catch (err) {
        console.log(err);
        return "ERR";
    }
}
function onvnot(vnot, id) {
    $(vnot).on("touchstart mousedown", function (e) {
        hl($(vnot), "danger");
        record(function (blob) {
            onrec(blob, id);
        }, $(vnot));
    });
    $(vnot).on("touchend mouseup", function (e) {
        hl($(vnot), "primary");
        recordStop();
    });
}
var callid = null;
var local_stream;
var peercl = null;
function hangupu() {
    if (local_stream != null) {
        local_stream.getTracks().forEach(function (track) {
            track.stop();
            peercl.destroy();
            callstat = 0;
            local_stream = null;
            hl($(".callstat").text(".."), "warning");
        });
        return;
    }
}

function call(id) {
    var u2 = getuser(id);
    if (id == myid) {
        alert("لا يمكنك الاتصال بنفسك");
        return;
    }
    if (callstat == 0 && isrecorder == false && istalkromm == false && local_stream == null && $(".callnot").length == 0 && u2 != null) {
        callstat = 1;
        callid = id;
        var h = $($("#callnot").html());
        var uh = $($("#uhtml").html());
        uh.find(".u-msg").remove();
        var roomid = myid.slice(7, 10) + u2.id.slice(7, 10);
        uh.find(".u-topic").html(u2.topic).css({
            color: u2.ucol,
            "background-color": u2.bg,
        });
        uh.find(".u-pic")
            .css("background-image", 'url("' + u2.pic + '")')
            .css({
                width: "24px",
                height: "24px",
            });
        h.find(".uzer").append(uh);
        h.addClass(u2.id);
        h.addClass("callnot");
        h.attr("callid", roomid);
        hl($(".callstat").text(".."), "warning");
        h.find(".callaccept").hide();
        h.find(".calldeny").click(function (params) {
            h.remove();
            SEND_EVENT_SEOHOST("calldeny", {
                caller: myid,
                called: id,
                roomid: roomid,
            });
            hangupu();
        });
        $(document.body).append(h);
        // h.draggable({
        //     containment: "body",
        //     scroll: false
        // });
        updateu(u2.id);
        SEND_EVENT_SEOHOST("calling", {
            caller: myid,
            called: id,
            roomid: roomid,
        });
        CallUser(roomid);
    } else {
        alert("فشل الإتصال حاول مره اخرى .");
    }
}
const PeerConfig = {
    host: "/",
    port: 9000,
    path: "/myapp",
};
function CallUser(data) {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    peercl = new Peer(data);
    peercl.on("open", (id) => {
        getUserMedia(
            {
                video: false,
                audio: true,
            },
            (stream) => {
                local_stream = stream;
                setLocalStream(local_stream);
                hl($(".callstat").text("يتم الإتصال .."), "warning");
            },
            (err) => {
                alert("خطأ في الى الميكروفون");
            }
        );
        hl($(".callstat").text("الاتصال قيد التنفيذ..."), "warning");
    });
    peercl.on("call", (call) => {
        call.answer(local_stream);
        call.on("stream", (stream) => {
            setRemoteStream(stream);
        });
    });
}
function setLocalStream(stream) {
    let video = document.getElementById("local-video");
    video.srcObject = stream;
    video.muted = true;
    video.play();
}
function setRemoteStream(stream) {
    let video = document.getElementById("audiocall");
    var n = document.createElement("audio");
    n.autoplay = !0;
    n.srcObject = stream;
    n.className = "audiocall";
    n.volume = 0.1;
    document.body.appendChild(n);
    // video.play();
}
function volumeup() {
    document.querySelector(".audiocall").volume = 1;
    $(".vulomeup").attr("onclick", "volumedown();");
    var elemnt = $(".vulomeup");
    elemnt.addClass("style");
}
function volumedown() {
    document.querySelector(".audiocall").volume = 0.1;
    $(".vulomeup").attr("onclick", "volumeup();");
    var elemnt = $(".vulomeup");
    elemnt.removeClass("style");
}
function meuted() {
    local_stream.getAudioTracks()[0].enabled = false;
    $(".meutee").attr("onclick", "unmeuted();");
    var elemnt = $(".meutee");
    elemnt.addClass("style");
}
function unmeuted() {
    local_stream.getAudioTracks()[0].enabled = true;
    $(".meutee").attr("onclick", "meuted();");
    var elemnt = $(".meutee");
    elemnt.removeClass("style");
}
function Callanswer(data, idu) {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    peercl = new Peer();
    peercl.on("open", (id) => {
        getUserMedia(
            {
                video: false,
                audio: true,
            },
            (stream) => {
                local_stream = stream;
                setLocalStream(local_stream);
                let call = peercl.call(data, stream);
                hl($(".callstat").text("متصل .!"), "success");
                SEND_EVENT_SEOHOST("calldone", {
                    id: idu,
                });
                call.on("stream", (stream) => {
                    setRemoteStream(stream);
                });
            },
            (err) => {
                alert("خطأ في الى الميكروفون");
            }
        );
    });
}
function openw(id, open) {
    var u = getuser(id);
    if (u == null) {
        return;
    }
    if ($("#c" + id).length == 0) {
        var uhh = $(uhtml);
        var ico = getico(u);
        if (ico != "") {
            uhh.find(".u-ico").attr("src", ico);
        }
        uhh.find(".u-msg").text("..");
        uhh.find(".uhash").text(u.idreg);
        uhh.find(".u-pic").css({
            "background-image": 'url("' + u.pic + '")',
        });
        $("<div id='c" + id + "' onclick='' style='width:99%;padding: 2px;' class='cc noflow nosel   hand break'></div>").prependTo("#chats #seo");
        $("#c" + id)
            .append(uhh)
            .append("<div onclick=\"wclose('" + id + '\')" style="    margin-top: -30px;margin-right: 2px;" class="label border mini bg-danger fr fa fa-times">حذف</div>')
            .find(".uzr")
            .css("width", "100%")
            .attr("onclick", "openw('" + id + "',true);")
            .find(".u-msg")
            .addClass("dots");
        var dod = $($("#cw").html());
        $(dod).addClass("w" + id);
        $(dod).addClass("removechat");
        $(dod)
            .find(".emo")
            .addClass("emo" + id);
        dod.find(".fa-user").click(function () {
            upro(id);
            $("#upro").css("z-index", "2002");
        });
        dod.find(".head .u-pic").css("background-image", 'url("' + u.pic + '")');
        var uh = $(uhtml);
        if (ico != "") {
            uh.find(".u-ico").attr("src", ico);
        }
        uh.find(".head .u-pic")
            .css("width", "28px")
            .css("height", "28px")
            .css("margin-top", "-2px")
            .parent()
            .click(function () {
                upro(id);
            });
        uh.css("width", "70%").find(".u-msg").remove();
        $(dod).find(".uh").append(uh);
        $(dod)
            .find(".d2")
            .attr("id", "d2" + id);
        $(dod)
            .find(".wc")
            .click(function () {
                wclose(id);
            });
        $(dod)
            .find(".fa-share-alt")
            .click(function () {
                sendfile(id);
            });
        $(dod).find(".typ").hide();
        $(dod)
            .find(".sndpm")
            .click(function (e) {
                e.preventDefault();
                sendpm({
                    data: {
                        uid: id,
                    },
                });
            });

        $(dod)
            .find(".microphone")
            .click(function () {
                StartRecorder(id);
            });
        $(dod)
            .find(".stopmico")
            .click(function () {
                StopRecorder();
            });
        $(dod)
            .find(".call")
            .click(function () {
                call(id);
            });
        // $(dod).find(".call").remove();
        $(dod)
            .find(".tbox")
            .addClass("tbox" + id)
            .keyup(function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    sendpm({
                        data: {
                            uid: id,
                        },
                    });
                }
                if (updateTypingT) updateTyping(id);
            })
            .on("focus", function () {
                tbox = $(this).parent().parent().parent();
                tboxid = id;
                tboxl = -1;
            })
            .on("blur", function () {});
        var ubg = u.bg;
        if (ubg == "") {
            ubg = "#FAFAFA";
        }
        $(dod).find(".head").append(uhead());
        dod.find(".u-ico").attr("src", ico);
        $(".dad").append(dod);
        emopop(".emo" + id);
        $(dod)
            .find(".head .u-pic")
            .css("background-image", "url('" + u.pic + "')")
            .css("width", "20px")
            .css("height", "20px")
            .parent()
            .click(function () {
                upro(id);
                $("#upro").css("z-index", "2002");
            });
        $(dod).find(".head .u-topic").css("color", u.ucol).css("background-color", ubg).html(u.topic);
        $(dod)
            .find(".head .phide")
            .click(function () {
                $(dod).removeClass("active").hide();
                showmsgs = null;
            });
        $("#c" + id)
            .find(".uzr")
            .click(function () {
                $("#c" + id).removeClass("unread");
                msgs();
            });
        updateu(id);
    }
    if (open) {
        $(".phide").trigger("click");
        $(".w" + id)
            .css("display", "")
            .addClass("active")
            .show();
        $(".pn2").hide();
        setTimeout(function () {
            fixSize(1);
            $(".w" + id)
                .find(".d2")
                .scrollTop($(".w" + id).find(".d2")[0].scrollHeight);
        }, 50);
        $("#dpnl").hide();
        showmsgs = id;
    } else {
        if ($(".w" + id).css("display") == "none") {
            $("#c" + id).addClass("unread");
        }
    }
    msgs();
}
function popover(el, data, pos) {
    var e = $(el);
    e.popover({
        placement: pos || "top",
        html: true,
        content: function () {
            return $(data)[0].outerHTML;
        },
        title: "",
    });
}
function msgs() {
    var co = $("#chats").find(".unread").length;
    if (co != 0) {
        $(".chats").attr("title", "المحادثات الخاصة:" + co + "");
        hl($(".chats"), "warning");
    } else {
        $(".chats").find(".badge").text("");
        hl($(".chats"), "primary");
    }
}
var uhd = "*";
function uhead() {
    if (uhd == "*") {
        uhd = $("#uhead").html();
    }
    return uhd;
}
function loadpro() {
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength, padString) {
            targetLength = targetLength >> 0;
            padString = String(padString !== undefined ? padString : " ");
            if (this.length >= targetLength) {
                return String(this);
            } else {
                targetLength = targetLength - this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength / padString.length);
                }
                return padString.slice(0, targetLength) + String(this);
            }
        };
    }
    jQuery.fn.sort = (function () {
        var sort = [].sort;
        return function (comparator, getSortable) {
            getSortable =
                getSortable ||
                function () {
                    return this;
                };
            var placements = this.map(function () {
                var sortElement = getSortable.call(this),
                    parentNode = sortElement.parentNode,
                    nextSibling = parentNode.insertBefore(document.createTextNode(""), sortElement.nextSibling);
                return function () {
                    if (parentNode === this) {
                        throw new Error("You can't sort elements if any one is a descendant of another.");
                    }
                    parentNode.insertBefore(this, nextSibling);
                    parentNode.removeChild(nextSibling);
                };
            });
            return sort.call(this, comparator).each(function (i) {
                placements[i].call(getSortable.call(this));
            });
        };
    })();
    if (!Array.prototype.findall) {
        Array.prototype.findall = function (fun) {
            "use strict";
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var funn = fun;
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") {
                funn = function (i, e) {
                    var k = Object.keys(fun);
                    var isok = 0;
                    k.forEach(function (ee, ii) {
                        if (funn[ee] == e[ee]) {
                            isok += 1;
                        }
                    });
                    return isok == k.length;
                };
            }
            var arr = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];
                    if (funn.call(thisArg, val, i, t)) {
                        arr.push(val);
                    }
                }
            }
            return arr;
        };
    }
    if (!Array.prototype.findone) {
        Array.prototype.findone = function (fun) {
            "use strict";
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var funn = fun;
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") {
                funn = function (i, e) {
                    var k = Object.keys(fun);
                    var isok = 0;
                    k.forEach(function (ee, ii) {
                        if (funn[ee] == e[ee]) {
                            isok += 1;
                        }
                    });
                    return isok == k.length;
                };
            }
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];
                    if (funn.call(thisArg, val, i, t)) {
                        return val;
                    }
                }
            }
            return null;
        };
    }
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, thisArg) {
            var T, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }
            if (arguments.length > 1) {
                T = thisArg;
            }
            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }
    Array.prototype.remove = function () {
        var what,
            a = arguments,
            L = a.length,
            ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };
}
(function ($) {
    $.fn.popTitle = function (html) {
        var popclose = this.parent().parent().find(".phide").detach();
        this.parent().parent().find(".pophead").html(html).prepend(popclose);
        return this;
    };
    $.fn.pop = function (options) {
        if (this.hasClass("pop")) {
            return this.find(".popbody").children(0).pop(options);
        }
        switch (options) {
            case "show":
                if (this.parent().hasClass("popbody") == false) {
                    this.pop();
                }
                $(".pop").css("z-index", 2000);
                this.parent().parent().css("z-index", 2001);
                this.parent().parent().css("display", "");
                fixSize();
                return this;
                break;
            case "hide":
                this.parent().parent().css("display", "none");
                return this;
                break;
            case "remove":
                this.parent().parent().remove();
                return this;
                break;
        }
        var settings = $.extend(
            {
                width: "50%",
                height: "50%",
                top: "5px",
                left: "5px",
                title: "",
                close: "hide",
                bg: $(document.body).css("background-color"),
            },
            options
        );
        var popup = $('<div class="pop corner" style="border:1px solid lightgrey;display:none;max-width:95%;position:absolute;z-index:2000;top:' + settings.top + ";left:" + settings.left + '"></div>').css({
            "background-color": settings.bg,
            width: settings.width,
            height: settings.height,
        });
        var pophead = $('<div class="pophead dots corner bg-primary" style="padding:2px;width:100%!important;"></div>').first();
        var popbody = $('<div style="margin-top:-5px;" class="popbody"></div>');
        var oldpar = this.parent();
        popbody.append(this);
        pophead.html(settings.title);
        pophead.prepend("<span onclick=\"$(this).pop('" + settings.close + '\')" class="phide pull-right clickable border label bg-danger"><i class="fa fa-times"></i></span>');
        popup.on("resize", function () {
            popbody.css("height", popup.height() - pophead.outerHeight(true) + "px");
        });
        popup.append(pophead);
        popup.append(popbody);
        if (oldpar.length == 0) {
            $("#content").append(popup);
        } else {
            oldpar.append(popup);
        }
        return this;
    };
})(jQuery);
function getCSSRule(ruleName, deleteFlag) {
    ruleName = ruleName.toLowerCase();
    if (document.styleSheets) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var styleSheet = document.styleSheets[i];
            var ii = 0;
            var cssRule = false;
            do {
                if (styleSheet.cssRules) {
                    cssRule = styleSheet.cssRules[ii];
                } else {
                    cssRule = styleSheet.rules[ii];
                }
                if (cssRule) {
                    if (cssRule.selectorText == ruleName) {
                        if (deleteFlag == "delete") {
                            if (styleSheet.cssRules) {
                                styleSheet.deleteRule(ii);
                            } else {
                                styleSheet.removeRule(ii);
                            }
                            return true;
                        } else {
                            return cssRule;
                        }
                    }
                }
                ii++;
            } while (cssRule);
        }
    }
    return false;
}
function killCSSRule(ruleName) {
    return getCSSRule(ruleName, "delete");
}
function addCSSRule(ruleName) {
    if (document.styleSheets) {
        if (!getCSSRule(ruleName)) {
            if (document.styleSheets[0].addRule) {
                document.styleSheets[0].addRule(ruleName, null, 0);
            } else {
                document.styleSheets[0].insertRule(ruleName + " { }", 0);
            }
        }
    }
    return getCSSRule(ruleName);
}

function sendpic(data) {
    ispic = data;
    var e = $("#change_avatar_input");
    e.trigger("click");
    var xx;
    $("#change_avatar_input").off("change").on("change", function () {
        if(ispic ==1){
            $(".spic").attr("src", "imgs/ajax-loader.gif");
        }else{
            $(".afspic").attr("src", "imgs/ajax-loader.gif");
        }
        var formData = new FormData();
        formData.append("photo", $(e).prop("files")[0]);
        xx = $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener(
                    "progress",
                    function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                        }
                    },
                    false
                );
                return xhr;
            },
            timeout: 0,
            url: "pic?secid=u&fn=" + $(e).val().split(".").pop(),
            type: "POST",
            data: formData,
            datatype: "json",
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                if(ispic==1){
                    $(".spic").attr("src", data);
                    SEND_EVENT_SEOHOST("setpic", {
                        pic: data,
                        ispic:ispic
                    });
                }else if(ispic==2){
                    $(".afspic").attr("src", data);
                    SEND_EVENT_SEOHOST("setpic", {
                        pic: data,
                        ispic:ispic
                    });
                }
                
            },
            error: function (e) {
                $(".spic").attr("src", "");
                alert("فشل إرسال الصوره تأكد ان حجم الصوره مناسب");
            },
        });
    });
}
function sendpicroom(id) {
    var e = $("<input  accept='image/*' type='file' style='display:none;'/>").first();
    e.trigger("click");
    var xx;
    $(e).on("change", function () {
        $(".picroom").attr("src", "imgs/ajax-loader.gif");
        var formData = new FormData();
        formData.append("photo", $(e).prop("files")[0]);
        xx = $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener(
                    "progress",
                    function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                        }
                    },
                    false
                );
                return xhr;
            },
            timeout: 0,
            url: "picroom?secid=u&fn=" + $(e).val().split(".").pop(),
            //      url: 'pic?secid=room&fo=pic',
            type: "POST",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                $(".picroom").attr("src", data);
            },
            error: function (e) {
                $(".spic").attr("src", "");
                alert("فشل إرسال الصوره تأكد ان حجم الصوره مناسب");
            },
        });
    });
}
const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const media = new Audio(reader.result);
            media.onloadedmetadata = () => resolve(media.duration);
        };
        reader.readAsDataURL(file);
        reader.onerror = (error) => reject(error);
    });

const handleChange = async (e) => {
    const duration = await getVideoDuration(e.target.files[0]);
    timest = duration | 0;
};

function Send_STORY() {
    pickedfile = null;
    var e = $("<div></div>").first();

    e.append("<input type='file'  accept='image/*, video/*, audio/*' style='display:none;' onchange='handleChange(event)'/>");

    e.children("input").trigger("click");
    var xx;
    $(e)
        .children("input")
        .on("change", function () {
            var sp = $("<div class='mm msg fl' style='width:100%;'><a class='fn fl'></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>");
            var formData = new FormData();
            formData.append("photo", $(e).children("input").prop("files")[0]);
            $("#storyes").prepend(sp);
            $(sp)
                .find(".cancl")
                .click(function () {
                    $(sp).remove();
                    xx.abort();
                });
            xx = $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener(
                        "progress",
                        function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                $(sp.find(".fn")).text("%" + parseInt(percentComplete * 100) + " | " + $(e).children("input").val().split("\\").pop());
                            }
                        },
                        false
                    );
                    return xhr;
                },
                timeout: 0,
                url: "uploadstory?secid=u&token=" + token + "&fn=" + $(e).children("input").val().split(".").pop(),
                type: "POST",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    pickedfile = data;
                    SEND_EVENT_SEOHOST("uploadstory", {
                        photo: data,
                        time: timest,
                    });
                    $(e).remove();
                    $(sp).remove();
                },
                error: function () {
                    $(sp).remove();
                },
            });
        });
}
function sendfile(id, onSEND_EVENT_SEOHOST) {
    pickedfile = null;
    var e = $("<div></div>").first();
    if (onSEND_EVENT_SEOHOST == "startrecorder") {
        e.append("<input type='file' accept='audio/*' capture style='display:none;'/>");
    } else {
        e.append("<input type='file'  accept='image/*, video/*, audio/*' style='display:none;'/>");
    }
    e.children("input").trigger("click");
    var xx;
    $(e)
        .children("input")
        .on("change", function () {
            var sp = $("<div class='mm msg fl' style='width:100%;'><a class='fn fl'></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>");
            $("#d2" + id).append(sp);
            var formData = new FormData();
            formData.append("photo", $(e).children("input").prop("files")[0]);
            $(sp)
                .find(".cancl")
                .click(function () {
                    $(sp).remove();
                    xx.abort();
                });
            xx = $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener(
                        "progress",
                        function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                $(sp.find(".fn")).text("%" + parseInt(percentComplete * 100) + " | " + $(e).children("input").val().split("\\").pop());
                            }
                        },
                        false
                    );
                    return xhr;
                },
                timeout: 0,
                url: "upload?secid=u&token=" + token + "&fn=" + $(e).children("input").val().split(".").pop(),
                type: "POST",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    pickedfile = data;
                    if (onSEND_EVENT_SEOHOST != null && onSEND_EVENT_SEOHOST != "startrecorder") {
                        onSEND_EVENT_SEOHOST(data);
                    } else {
                        SEND_EVENT_SEOHOST("pm", {
                            msg: "",
                            link: data,
                            id: id,
                        });
                    }
                    $(e).remove();
                    $(sp).remove();
                },
                error: function () {
                    $(sp).remove();
                },
            });
        });
}
function encode(e) {
    return encodeURIComponent(e).split("'").join("%27");
}
function decode(e) {
    return decodeURIComponent(e);
}
function isls() {
    return "undefined" != typeof Storage;
}
function setv(e, t) {
    isls() ? localStorage.setItem(e, t) : setCookie(e, t);
}
function getv(e) {
    if (isls()) {
        var t = localStorage.getItem(e);
        return ("null" == t || null == t) && (t = ""), t;
    }
    return getCookie(e);
}
function setCookie(e, t) {
    var o = new Date();
    o.setTime(o.getTime() + 28771200000);
    var n = "expires=" + o.toUTCString();
    document.cookie = e + "=" + encode(t) + "; " + n;
}
function getCookie(e) {
    for (var t, o = e + "=", n = document.cookie.split(";"), d = 0; d < n.length; d++) {
        for (t = n[d]; " " == t.charAt(0); ) t = t.substring(1);
        if (-1 != t.indexOf(o)) return decode(t.substring(o.length, t.length));
    }
    return "";
}
async function fg(e) {
    try {
        var t = ic.get(e.user, e.it);
        t || (t = await fr(e.user, e.it));
        var o = new RTCSessionDescription(e.sdp);
        await t.setRemoteDescription(o),
            await t.setLocalDescription(await t.createAnswer()),
            fm({
                it: e.it,
                target: e.user,
                type: "video-answer",
                sdp: t.localDescription,
            });
    } catch (e) {
        fl(e);
    }
}
async function fh(e) {
    var t = ic.get(e.user, e.it);
    await t.setRemoteDescription(e.sdp).catch(fl);
}
async function fi(e) {
    var t = ic.get(e.user, e.it),
        o = new RTCIceCandidate(e.candidate);
    try {
        await t.addIceCandidate(o);
    } catch (e) {
        fl(e);
    }
}
function fk(e, t, o) {
    switch (e.name) {
        case "NotFoundError":
            fs("غير قادر على الانظام الى البث الصوتي بسبب ان هناك مشكله بالوصل الى الميكروفون الخاص بك");
            break;
        case "SecurityError":
        case "PermissionDeniedError":
            break;
        default:
            fs("خطأ في الى الميكروفون");
    }
    fj(o, t);
}
function fl(e) {
    console.log(`Error ${e.name}: ${e.message}`);
}
function fs(e) {
    ondata("not", {
        force: !0,
        msg: e,
        user: "",
    });
}
uf = {
    kw: "الكويت",
    et: "إثيوبيا",
    az: "أذربيجان",
    am: "أرمينيا",
    aw: "أروبا",
    er: "إريتريا",
    es: "أسبانيا",
    au: "أستراليا",
    ee: "إستونيا",
    il: "فلسطين",
    af: "أفغانستان",
    ec: "إكوادور",
    ar: "الأرجنتين",
    jo: "الأردن",
    ae: "الإمارات العربية المتحدة",
    al: "ألبانيا",
    bh: "مملكة البحرين",
    br: "البرازيل",
    pt: "البرتغال",
    ba: "البوسنة والهرسك",
    ga: "الجابون",
    dz: "الجزائر",
    dk: "الدانمارك",
    cv: "الرأس الأخضر",
    ps: "فلسطين",
    sv: "السلفادور",
    sn: "السنغال",
    sd: "السودان",
    se: "السويد",
    so: "الصومال",
    cn: "الصين",
    iq: "العراق",
    ph: "الفلبين",
    cm: "الكاميرون",
    cg: "الكونغو",
    cd: "جمهورية الكونغو الديمقراطية",
    de: "ألمانيا",
    hu: "المجر",
    ma: "المغرب",
    mx: "المكسيك",
    sa: "المملكة العربية السعودية",
    uk: "المملكة المتحدة",
    gb: "المملكة المتحدة",
    no: "النرويج",
    at: "النمسا",
    ne: "النيجر",
    in: "الهند",
    us: "الولايات المتحدة",
    jp: "اليابان",
    ye: "اليمن",
    gr: "اليونان",
    ag: "أنتيغوا وبربودا",
    id: "إندونيسيا",
    ao: "أنغولا",
    ai: "أنغويلا",
    uy: "أوروجواي",
    uz: "أوزبكستان",
    ug: "أوغندا",
    ua: "أوكرانيا",
    ir: "إيران",
    ie: "أيرلندا",
    is: "أيسلندا",
    it: "إيطاليا",
    pg: "بابوا-غينيا الجديدة",
    py: "باراجواي",
    bb: "باربادوس",
    pk: "باكستان",
    pw: "بالاو",
    bm: "برمودا",
    bn: "بروناي",
    be: "بلجيكا",
    bg: "بلغاريا",
    bd: "بنجلاديش",
    pa: "بنما",
    bj: "بنين",
    bt: "بوتان",
    bw: "بوتسوانا",
    pr: "بورتو ريكو",
    bf: "بوركينا فاسو",
    bi: "بوروندي",
    pl: "بولندا",
    bo: "بوليفيا",
    pf: "بولينزيا الفرنسية",
    pe: "بيرو",
    by: "بيلاروس",
    bz: "بيليز",
    th: "تايلاند",
    tw: "تايوان",
    tm: "تركمانستان",
    tr: "تركيا",
    tt: "ترينيداد وتوباجو",
    td: "تشاد",
    cl: "تشيلي",
    tz: "تنزانيا",
    tg: "توجو",
    tv: "توفالو",
    tk: "توكيلاو",
    to: "تونجا",
    tn: "تونس",
    tp: "تيمور الشرقية",
    jm: "جامايكا",
    gm: "جامبيا",
    gl: "جرينلاند",
    pn: "جزر البتكارين",
    bs: "جزر البهاما",
    km: "جزر القمر",
    cf: "أفريقيا الوسطى",
    cz: "جمهورية التشيك",
    do: "جمهورية الدومينيكان",
    za: "جنوب أفريقيا",
    gt: "جواتيمالا",
    gp: "جواديلوب",
    gu: "جوام",
    ge: "جورجيا",
    gs: "جورجيا الجنوبية",
    gy: "جيانا",
    gf: "جيانا الفرنسية",
    dj: "جيبوتي",
    je: "جيرسي",
    gg: "جيرنزي",
    va: "دولة الفاتيكان",
    dm: "دومينيكا",
    rw: "رواندا",
    ru: "روسيا",
    ro: "رومانيا",
    re: "ريونيون",
    zm: "زامبيا",
    zw: "زيمبابوي",
    ws: "ساموا",
    sm: "سان مارينو",
    sk: "سلوفاكيا",
    si: "سلوفينيا",
    sg: "سنغافورة",
    sz: "سوازيلاند",
    sy: "سوريا",
    sr: "سورينام",
    ch: "سويسرا",
    sl: "سيراليون",
    lk: "سيريلانكا",
    sc: "سيشل",
    rs: "صربيا",
    tj: "طاجيكستان",
    om: "عمان",
    gh: "غانا",
    gd: "غرينادا",
    gn: "غينيا",
    gq: "غينيا الاستوائية",
    gw: "غينيا بيساو",
    vu: "فانواتو",
    fr: "فرنسا",
    ve: "فنزويلا",
    fi: "فنلندا",
    vn: "فيتنام",
    cy: "قبرص",
    qa: "قطر",
    kg: "قيرقيزستان",
    kz: "كازاخستان",
    nc: "كاليدونيا الجديدة",
    kh: "كامبوديا",
    hr: "كرواتيا",
    ca: "كندا",
    cu: "كوبا",
    ci: "ساحل العاج",
    kr: "كوريا",
    kp: "كوريا الشمالية",
    cr: "كوستاريكا",
    co: "كولومبيا",
    ki: "كيريباتي",
    ke: "كينيا",
    lv: "لاتفيا",
    la: "لاوس",
    lb: "لبنان",
    li: "لشتنشتاين",
    lu: "لوكسمبورج",
    ly: "ليبيا",
    lr: "ليبيريا",
    lt: "ليتوانيا",
    ls: "ليسوتو",
    mq: "مارتينيك",
    mo: "ماكاو",
    fm: "ماكرونيزيا",
    mw: "مالاوي",
    mt: "مالطا",
    ml: "مالي",
    my: "ماليزيا",
    yt: "مايوت",
    mg: "مدغشقر",
    eg: "مصر",
    mk: "مقدونيا، يوغوسلافيا",
    mn: "منغوليا",
    mr: "موريتانيا",
    mu: "موريشيوس",
    mz: "موزمبيق",
    md: "مولدوفا",
    mc: "موناكو",
    ms: "مونتسيرات",
    me: "مونتينيغرو",
    mm: "ميانمار",
    na: "ناميبيا",
    nr: "ناورو",
    np: "نيبال",
    ng: "نيجيريا",
    ni: "نيكاراجوا",
    nu: "نيوا",
    nz: "نيوزيلندا",
    ht: "هايتي",
    hn: "هندوراس",
    nl: "هولندا",
    hk: "هونغ كونغ",
    wf: "واليس وفوتونا",
};
mime = {
    mov: "video/mov",
    aac: "audio/aac",
    m4a: "audio/m4a",
    avi: "video/x-msvideo",
    gif: "image/gif",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    mid: "audio/midi",
    midi: "audio/midi",
    mp2: "audio/mpeg",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    mpa: "video/mpeg",
    mpe: "video/mpeg",
    mpeg: "video/mpeg",
    oga: "audio/ogg",
    ogv: "video/ogg",
    png: "image/png",
    svg: "image/svg+xml",
    tif: "image/tiff",
    tiff: "image/tiff",
    wav: "audio/x-wav",
    weba: "audio/webm",
    webm: "video/webm",
    webp: "image/webp",
    "3gp": "video/3gpp",
    "3gp2": "video/3gpp2",
};
