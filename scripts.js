// Check class
function checkClass(elem, className) {
    return (elem.classList.contains) ? elem.classList.contains(className) : elem.getAttribute('class').indexOf(className) > -1;
}
// Add class
function addClass(elem, className) {
    if (elem.classList) {
        elem.classList.add(className);
    } else if (!checkClass(elem, className)) {
        elem.setAttribute('class', elem.getAttribute('class') + ' ' + className);
    }
}

// Remove class
function removeClass(elem, className) {
    if (elem.classList) {
        elem.classList.remove(className);
    } else if (checkClass(elem, className)) {
        elem.setAttribute('class', elem.getAttribute('class').replace(className, ' '));
    }
}

// Remove trailing whitespaces 
function RemoveTrailingSpace(str) {
	if (typeof str === "string") {
		for (var i = str.length-1; i >= 0; i--) {
			if (str.charAt(i).search(/\S/) !== -1) {
				str = str.substring(0, i+1);
				break;
			}
		}
	}
	return str;
}

// Remove extra whitespaces 
function RemoveExtraSpaces(str) {
	var returnStr = '';
	var strArray = str.split(/\s+/);
	for (var i = 0; i < strArray.length; i++) {
		if (strArray[i] !== '') {
			if (i === strArray.length - 1) {
				returnStr += strArray[i];
			} else { returnStr += strArray[i] + ' '; }
		}
	}
	return RemoveTrailingSpace(returnStr);
}

function UpperCase_FirstChar(str) {
  return (typeof str === "string") ? str[0].toUpperCase() + str.slice(1) : str;
}

// Remove html tags 
function PrepareString(str) { return RemoveExtraSpaces( str.replace(/<[^>]+>/g, '') ); }

// Remove url protocol 
function RemoveProtocol(url) { return url.replace(/(^\w+:|^)\/\//, ''); }

// Remove url parameters 
function PrepareUrl(url) { return RemoveProtocol(url.replace(/[?].*$/, '').replace(/\/$/, '')); }

// Array to string
function ArrayToStr(arr) {
	var result = '';
	if (arr.length > 0) {
		result = arr[0];
		for (var i = 1; i < arr.length-1; i++) {
			result += ', ' + arr[i];
		}
		if (arr.length-1 > 0) {
			if (document.documentElement.lang == 'en-EN') {
				result += ' and ' + arr[arr.length-1];
			} else {
				result += ' и ' + arr[arr.length-1];	
			}
		}
	}
	return result;
}

// Count of words in a string 
function countWords(str) { return str.trim().split(/\s+/).length; }

// Get text width 
function getTextWidth(text, context) { return Math.ceil(context.measureText(text).width);}

// Calculating the length of text 
function getLength(text, maxWidth, font) {
	var words = text.split(/\ |-|—/);
	if (words.length > 0) {
		var line = words[0];
		// Preparation canvas 
		var context = document.createElement('canvas').getContext('2d');
		context.font = font;
		// Calculating the length 
		if (getTextWidth(line, context) < maxWidth) {
			for (var i = 1; i < words.length; i++) {
				if (getTextWidth(line + ' ' + words[i], context) <= maxWidth) {
					line += ' ' + words[i];					
				} else { break; }
			}
		} else {
		// if line is a long word
			line = text.slice(0, Math.floor(maxWidth/(getTextWidth(line, context)/line.length)));
			// line > maxWidth
			if (getTextWidth(line, context) > maxWidth) {
				for (var i = line.length; i < text.length; i++) {
					if (getTextWidth(line + text[i], context) < maxWidth) {
						line += text[i];
					} else { break; }
				}
			} else {
				// line <= maxWidth
				for (var i = line.length-1; i >= 0; i--) {
					if (getTextWidth(line, context) > maxWidth) {
						line = text.slice(0, i);
					} else { break; }
				}	
			}
		}
	}
	return line.length;
}

// Shorten the string 
function ShortenStr(text, maxWidth, font) {
	// DefaultValue (Supported IE)
	font = (font === undefined) ? '14px arial' : font;
	// Calculating the length of text 
	var length = getLength(text, maxWidth, font);
	// Shorten...
	if (text.length > length) {
		// Find the last one delimiter 
		var delimiter = [' ', '-', '—'];
		var tmpIndex = -1;
		var index = -1;
		// Find delimiter index 
		for (var i = 0; i < delimiter.length; i++) {
			tmpIndex = text.lastIndexOf(delimiter[i], length-1);
			if (index < tmpIndex) { index = tmpIndex; }	
		}
		// Removing punctuation marks 
		if (text[index] == ' ') {
			delimiter = ['.', ',', '!', '?', '…'];
			for (i = 0; i < delimiter.length; i++) {
				if (text[index-1] == delimiter[i]) {
					index = index-1;
					break;
				}	
			}
		// Save transfer symbol 
		} else { index = index+1; } 
		// Checking and return the result 
		return (index == -1) ? text.slice(0, length-1) + '…' : text.slice(0, index) + '…';
	} else {
		return text;
	}
}

// Shorten the string 
function ShortenLink(url, maxWidth, font) {
	font = (font === undefined) ? '14px arial' : font;
	// Calculating the length of text 
	var length = getLength(url, maxWidth, font);
	// Shorten...
	if (url.length > length) {
		// Find the last one delimiter 
		var index = url.lastIndexOf('›', length-2);
		// Checking and return the result 
		for (var i = index-1; i >= 1; i--) {
			if (url[i] == ' ') {
				index = i;
			} else { break; } 	
		}
		return (index == -1) ? url.slice(0, length-1) + '…' : url.slice(0, index) + ' › …';
	} else {
		return url;
	}
}

// Wrap text to html tag 
function WrapHtml(text, tag, classes, attr_name, attr_value) {
	tag = (tag === undefined) ? 'a' : tag;
	classes = (classes === undefined) ? '' : ' class="'+ classes +'"';
	attr_name = (attr_name === undefined) ? '' : ' '+ attr_name;
	attr_value = (attr_value === undefined) ? '' : '="'+ attr_value +'"';
	return '<'+ tag + classes + attr_name + attr_value +'>' + text + '</'+ tag +'>';			
}

// Wrap url to html tags 
function Wrap_Url(url) {
	var sitePages = url.split(' › ');
	var wrapedUrl = WrapHtml(sitePages[0]);
	for (var i = 1; i < sitePages.length; i++) {
		wrapedUrl += '<span>›</span>' + WrapHtml(sitePages[i]); 	
	}	
	return wrapedUrl;
}

// Build search engine results link 
function GetSERP_Url(url, breadcrumb) {
	var finalUrl = url;
	for (var i = 0; i < breadcrumb.length; i++) {
		finalUrl += (breadcrumb[i] !== '') ? ' › ' + breadcrumb[i] : '';	
	}
	return finalUrl; 
}

// Build search engine results link 
function GetUrlArray(url, breadcrumb) {
	var finalUrl = [url];
	for (var i = 0; i < breadcrumb.length; i++) {
		finalUrl.push(finalUrl[i] + '/' + breadcrumb[i].replace(/ /g, '-'));	
	}
	return finalUrl; 
}

// Get RadioButtons value
function GetRadioButton(name) {
    var arr = document.getElementsByName(name);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
            return arr[i].value;
        }
    }
	return '';
}

// Set attribute tooltip=""
function PrepareTooltip(elem, word) {
	// DefaultValue (Supported IE)
	word = (word === undefined) ? false : word;
	if (document.documentElement.lang == 'en-EN') {
		elem.setAttribute('tooltip', (word) ? countWords(elem.textContent) + ' words' : elem.textContent.length + ' characters');		
	} else {
		elem.setAttribute('tooltip', (word) ? countWords(elem.textContent) + ' слов' : elem.textContent.length + ' символов');	
	}			
}

// Set SERP tooltip
function SetTooltips() {
	var tooltip_unit = (GetRadioButton('tooltip_unit') == 'word') ? true : false;
	// Google
	PrepareTooltip(document.querySelector(".google-results .result-title"), tooltip_unit);
	PrepareTooltip(document.querySelector(".google-results .result-desc"), tooltip_unit);
	PrepareTooltip(document.querySelector(".google-results .result-link"), false);
	// Yandex
	PrepareTooltip(document.querySelector(".yandex-results .result-title"), tooltip_unit);
	PrepareTooltip(document.querySelector(".yandex-results .result-desc"), tooltip_unit);
	PrepareTooltip(document.querySelector(".yandex-results .result-link"), false);
	// Bing
	PrepareTooltip(document.querySelector(".bing-results .result-title"), tooltip_unit);
	PrepareTooltip(document.querySelector(".bing-results .result-desc"), tooltip_unit);
	PrepareTooltip(document.querySelector(".bing-results .result-link"), false);
}

// Create alert message
function CreateMsg(text, className, timeOut) {
	className = (className === undefined) ? '' : className;
	timeOut = (timeOut === undefined) ? 4000 : timeOut;	
	var newMsg = document.createElement('div');
	var parent = document.getElementsByClassName("app-alert_container")[0];
	// add class
	addClass(newMsg, "app-alert");
	if (className !== '') { addClass(newMsg, className); }
	addClass(newMsg, "fade");	
	// add context
	newMsg.innerHTML = '<span>' + text + '</span>';
	// assign parent
	parent.appendChild(newMsg);
	// assign function
	newMsg.onclick = function() { DisplayLayer(this, 'display: none;', false); }
	// show message
	DisplayLayer(newMsg, 'display: flex;');
	// hide message
	if (timeOut > 0) {
		setTimeout( function() {
			if (newMsg.style.cssText !== 'display: none;') {
				DisplayLayer(newMsg, 'display: none;', false);	
			}
		}, timeOut);
		// remove message
		setTimeout( function() {			
			parent.removeChild(newMsg);			
		}, timeOut + 200);
	}
}

// Creating an array of breadcrumb
function GetBreadcrumb() {
	var breadcrumb = [];
	for (var i = 1; i <= Number(document.getElementsByName('count-of-breadcrumb')[0].getAttribute('content')); i++) {
		breadcrumb.push(document.getElementById('crumb-'+i).value);	
	}
	// Delete empty strings	
	breadcrumb = breadcrumb.filter(function(elem) { return elem !== ''; });
	// Return array
	return breadcrumb; 
}

/* Sidebar functions */
// Animation display for sidebar, overlay and popup 
function DisplayLayer(layer, cssText, fadeIn) {
	fadeIn = (fadeIn === undefined) ? true : fadeIn;
	if (fadeIn) {
		layer.style.cssText = cssText; // cssText with Display Attribute 
		setTimeout(function() { addClass(layer, 'show'); }, 50 );
	} else {
		removeClass(layer, 'show');
		setTimeout(function() {layer.style.cssText = cssText}, 150 );
	}
}

// Hide/Show scrollbar
function HideScroll(bool) {	document.documentElement.style.cssText = (bool) ? 'overflow: hidden;' : ''; }

// Show/Hide sidebar 
function DisplaySidebar(value) {
	var sidebar = document.getElementsByClassName('app-sidebar')[0];
	// Desktop platform
	if (window.getComputedStyle(sidebar).zIndex < 1100) {
		var container = document.getElementsByClassName('app-box_outer')[0];
		if (value) {
			sidebar.removeAttribute('mode');
			container.removeAttribute('mode');		
		} else {
			sidebar.setAttribute('mode', 'hide');
			container.setAttribute('mode', 'wide');
		}
	} else {
		// Mobile platform
		var sidebar_overlay = document.getElementsByClassName('app-box_overlay')[0];
		if (value) {
			DisplayLayer(sidebar, 'display: flex;');
			DisplayLayer(sidebar_overlay, 'display: block;');
			HideScroll(true);
		} else {
			DisplayLayer(sidebar, '', false);
			DisplayLayer(sidebar_overlay, 'display: none;', false);
			HideScroll(false);
		}
	}
}

// If resize - reset sidebar and popup
window.addEventListener('resize', function(event){ 
	document.getElementsByClassName('app-sidebar')[0].style.cssText = '';
	document.getElementsByClassName('app-box_overlay')[0].style.cssText = 'display: none;';	
	document.getElementsByClassName('app-popup')[0].style.cssText = 'display: none;';
	HideScroll(false);
})

// Sidebar button click
document.getElementsByClassName('app-sidebar-toggle')[0].onclick = function() {
	if (window.getComputedStyle(document.getElementsByClassName('app-sidebar')[0]).zIndex < 1100) {
		if (this.parentNode.parentNode.hasAttribute('mode')) {
			DisplaySidebar(true);		
		} else {
			DisplaySidebar(false);
		}
	} else {
		if (this.parentNode.parentNode.style.cssText == 'display: flex;') {
			DisplaySidebar(false);
			document.getElementsByClassName('app-box-menu')[0].focus();
		} 
	}
}

// Sidebar mobile button click
document.getElementsByClassName('app-box-menu')[0].onclick = function() {
	DisplaySidebar(true);
	document.querySelector('.app-sidebar-navigation li.active').focus();
}
// Click on overlay
document.getElementsByClassName('app-box_overlay')[0].onclick = function() {
	DisplaySidebar(false);
	document.getElementsByClassName('app-box-menu')[0].focus();
}

function setEventByClassName(className, event, func) {
	var elems = document.getElementsByClassName(className);
	for (var i = 0; i < elems.length; i++) {
		if (event == 'onclick') { elems[i].onclick = func; }
		if (event == 'oninput') { elems[i].oninput = func; }
		if (event == 'onchange') { elems[i].onchange = func; }
	}
}
	
// Display the clear-button 	
setEventByClassName('search-field', 'oninput', function () {
	var style = this.parentNode.children[this.parentNode.children.length-2].style;
	if (this.value.length > 0) {
		if (style.display !== 'block') {
			style.display = 'block';
		}
	} else {
		if (style.display !== 'none') {
			style.display = 'none';
		}
	}			
})

function popupClose() {
	DisplayLayer(document.getElementsByClassName('app-popup')[0], 'display: none;', false);
	// returning the focus on button
	document.getElementsByClassName('app-box-get_code')[0].focus();
	HideScroll(false);
}

/* Popup functions */
// Close popup window
setEventByClassName('app-popup_close', 'onclick', function () { popupClose(); })
setEventByClassName('app-popup_ok', 'onclick', function () { popupClose(); })
setEventByClassName('app-popup_overlay', 'onclick', function () { popupClose(); })

// Deactivate on ESC
document.addEventListener('keydown', function(e) {
	var keyCode = e.keyCode;
	if (keyCode === 27) {
		if (document.getElementsByClassName('app-box_overlay')[0].style.cssText !== 'display: none;') {
			// Hide sidebar
			DisplaySidebar(false);
		}
		var popup = document.getElementsByClassName('app-popup')[0];
		if (popup.style.cssText !== 'display: none;') {
			// Hide popup window
			DisplayLayer(popup, 'display: none;', false);
			// returning the focus on button
			document.getElementsByClassName('app-box-get_code')[0].focus();
		}
	}
});	

// Open popup window 
document.getElementsByClassName('app-box-get_code')[0].onclick = function() {
	// Show popup window 
	DisplayLayer(document.getElementsByClassName('app-popup')[0], 'display: flex;');
	// Set focus on tab button
	document.getElementsByClassName('code-nav-link')[0].focus();
	HideScroll(true);
}

// Display the clear-button 	
setEventByClassName('search-field', 'oninput', function () {
	var style = this.parentNode.children[this.parentNode.children.length-2].style;
	if (this.value.length > 0) {
		if (style.display !== 'block') {
			style.display = 'block';
		}
	} else {
		if (style.display !== 'none') {
			style.display = 'none';
		}
	}			
})

// Clear and selecting input after click on clear-button 
function clearInputValue(elem) {
	elem.style.display = 'none';
	elem.parentNode.children[0].value = '';
	elem.parentNode.children[0].select();
}
setEventByClassName('btn-clear', 'onclick', function () { clearInputValue(this) })
setEventByClassName('btn-clear_white', 'onclick', function () { clearInputValue(this) })

// Code-box navigation 
setEventByClassName('code-nav-link', 'onclick', function () {
	if (!checkClass(this, 'active')) {
		// Clear links 
		var links = document.getElementsByClassName("code-nav-link");
		for (var i = 0; i < links.length; i++) {
			removeClass(links[i], 'active');
		}
		// Active selected link 
		addClass(this, 'active');
		// Change buttons attribute 
		var button = document.getElementsByClassName("app-popup_copy")[0];
		button.setAttribute('data-clipboard-target', '#'+ this.getAttribute('data-toggle') +' code')
		// Hide blocks 
		var active_block = document.getElementById(this.getAttribute('data-toggle'));
		if (!checkClass(active_block, 'active')) {
			var blocks = document.getElementsByClassName("code-block");
			for (i = 0; i < blocks.length; i++) {
				removeClass(blocks[i], 'active');
			}	
			// Show active block 
			addClass(active_block, 'active');
		}
	}
})

// Clear all input fields
document.getElementsByClassName('app-box-clear')[0].onclick = function() {
	document.getElementById('title').value = '';
	document.getElementById('desc').value = '';
	document.getElementById('url').value = '';
	for (var i = 1; i <= Number(document.getElementsByName('count-of-breadcrumb')[0].getAttribute('content')); i++) {
		document.getElementById('crumb-'+i).value = '';
	}
	// Clear label-counters
	document.getElementById('title').previousElementSibling.children[0].innerHTML = '<kbd>0</kbd>70';
	document.getElementById('desc').previousElementSibling.children[0].innerHTML = '<kbd>0</kbd>180';
	// Disabled button "Get Code"
	DisabledButton_GetCode();
	// Show message
	if (document.documentElement.lang == 'en-EN') {
		CreateMsg('Input fields cleared', 'success');
	} else {
		CreateMsg('Поля ввода очищены', 'success');	
	}
}

// Change tooltips if change radioButton
setEventByClassName('radio_btns', 'onchange', function () {
	SetTooltips();
	// Show message
	if (document.documentElement.lang == 'en-EN') {
		CreateMsg('Tooltips changed');
	} else {
		CreateMsg('Подсказки изменены');
	}
})

// Counting string length
function calcLength(input, max) {
	var length = PrepareString(input.value).length;
	input.previousElementSibling.children[0].innerHTML = (length > max) ? '<kbd class="text-danger">' + length + '</kbd>' + max : '<kbd>' + length + '</kbd>' + max;
}

// Counting title and description length
document.getElementById('title').oninput = function () {
	calcLength(this, 70);
	DisabledButton_GetCode();
}
document.getElementById('desc').oninput = function () {
	calcLength(this, 180);
	DisabledButton_GetCode();
}

// If change text - Disabled button 
setEventByClassName('input_fields', 'oninput', function () { DisabledButton_GetCode(); })

// Disabled GetCode button 
function DisabledButton_GetCode(bool) {
	bool = (bool === undefined) ? true : bool;
	DisabledButton(document.getElementsByClassName('app-box-get_code')[0], bool, 'First need to generate!');
}

// Disabled button and add tooltip
function DisabledButton(btn, bool, tooltip) {
	bool = (bool === undefined) ? true : bool;
	if (btn.disabled !== bool) {
		btn.disabled = bool;
		if (bool) {
			if (tooltip !== undefined) {
				btn.setAttribute('tooltip', tooltip);
				btn.setAttribute('flow', 'Up');
			}
		} else {
			btn.removeAttribute('tooltip');
			btn.removeAttribute('flowUp');
		}
	}
}

// Select menu item
function Select_MenuItem(item) {
	// Deactivate menu items
	for (var i = 0; i < item.parentNode.parentNode.children.length; i++) {
		removeClass(item.parentNode.parentNode.children[i], 'active');
	}
	// Activate menu item
	addClass(item.parentNode, 'active');
	// Show/Hide sections
	if (item.getAttribute('navItem') == 1) {
		DisplayLayer(document.getElementsByClassName('app-box-settings')[0], '', true);
		DisplayLayer(document.getElementsByClassName('app-box-serp')[0], '', true);
		DisplayLayer(document.getElementsByClassName('app-box-text')[0], 'display: none;', false);
		document.location.hash = '';
	} else {
		DisplayLayer(document.getElementsByClassName('app-box-settings')[0], 'display: none;', false);
		DisplayLayer(document.getElementsByClassName('app-box-serp')[0], 'display: none;', false);
		DisplayLayer(document.getElementsByClassName('app-box-text')[0], '', true);
		document.location.hash = '#meta';
	}
	if (window.getComputedStyle(document.getElementsByClassName('app-sidebar')[0]).zIndex >= 1100) {
		DisplaySidebar(false);
	}
}

// Menu item event onclick
setEventByClassName('app-sidebar-item', 'onclick', function () { Select_MenuItem(this); })

// Click on Generate button
document.getElementsByClassName('app-box-generator')[0].onclick = function() {
	GetResults();
	// Get resulting code
	GetCode();
	// Enabled GetCode button
	DisabledButton_GetCode(false);
	// Set tooltips
	SetTooltips();
	// Show message
	if (document.documentElement.lang == 'en-EN') {
		CreateMsg('SERPs generated', 'success');
	} else {
		CreateMsg('SERPs сгенерированы', 'success');
	}
}

// Output results
function GetResults() {
	// Get data
	var input_title = document.getElementById('title');
	var input_desc = document.getElementById('desc');
	var input_url = document.getElementById('url');
	// Prepare data
	var final_title = PrepareString(input_title.value); 
	var final_desc = PrepareString(input_desc.value); 
	var final_url = PrepareString(PrepareUrl(input_url.value));
	var breadcrumb = GetBreadcrumb();
	for (var i = 0; i < breadcrumb.length; i++) {
		breadcrumb[i] = PrepareString(breadcrumb[i]);	
	}
	// Check data
	var msg = [];
	if (final_title.length == 0) {
		if (document.documentElement.lang == 'en-EN') {
			msg.push('<code>Title</code>');
		} else {
			msg.push('<code>Заголовок</code>');	
		}
		final_title = document.getElementsByName('default-title')[0].getAttribute('content');
	}
	if (final_desc.length == 0) {
		if (document.documentElement.lang == 'en-EN') {
			msg.push('<code>Description</code>');
		} else {
			msg.push('<code>Описание</code>');	
		}
		final_desc = document.getElementsByName('default-description')[0].getAttribute('content');
	}
	if (final_url.length == 0) {
		msg.push('<code>URL</code>');
		final_url = document.getElementsByName('default-url')[0].getAttribute('content');
	}
	// Show message
	if (msg.length > 0) {
		if (document.documentElement.lang == 'en-EN') {
			CreateMsg(ArrayToStr(msg) + ' set to default value');
		} else {
			CreateMsg(ArrayToStr(msg) + ' приняли значение по умолчанию');
		}
	}
	// Set inputs value
	input_title.value = final_title;
	input_desc.value = final_desc;
	input_url.value = final_url;
	for (i = 1; i <= Number(document.getElementsByName('count-of-breadcrumb')[0].getAttribute('content')); i++) {
		document.getElementById('crumb-'+i).value = (i <= breadcrumb.length) ? breadcrumb[i-1] : '';
	}
	// Get final link
	final_url = GetSERP_Url(final_url, breadcrumb);
	// Counting input_title & input_desc value.length
	calcLength(input_title, 70);
	calcLength(input_desc, 180);
	// Set a platform
	var MobilePlatform = document.getElementsByName('platform')[0].checked;
	ChangePlatform(MobilePlatform);
	// Processing and returning the result
	if (!MobilePlatform) {
	// Desktop version 
		// Yandex
		document.querySelector(".yandex-results .result-title").innerHTML = WrapHtml(ShortenStr(final_title, 536, '18px arial'));
		document.querySelector(".yandex-results .result-desc").innerHTML = ShortenStr(final_desc, 534*3);
		document.querySelector(".yandex-results .result-link").innerHTML = Wrap_Url(ShortenLink(final_url, 522));
		// Google
		document.querySelector(".google-results .result-title").innerHTML = WrapHtml(ShortenStr(final_title, 600, '20px arial'));
		document.querySelector(".google-results .result-desc").innerHTML = ShortenStr(final_desc, 598*2);
		document.querySelector(".google-results .result-link").innerHTML = Wrap_Url(ShortenLink(final_url, 600));
		// Bing
		final_url = 'https://' + final_url;
		document.querySelector(".bing-results .result-title").innerHTML = WrapHtml(ShortenStr(final_title, 608, '20px roboto'));
		document.querySelector(".bing-results .result-desc").innerHTML = ShortenStr(final_desc, 606*2, '14px roboto');
		document.querySelector(".bing-results .result-link").innerHTML = Wrap_Url(ShortenLink(final_url, 608, '14px roboto'));
	} else {
	// Mobile version 
		// Yandex
		document.querySelector(".yandex-results .result-title").innerHTML = WrapHtml(ShortenStr(final_title, 333*3, '20px arial'));
		document.querySelector(".yandex-results .result-desc").innerHTML = ShortenStr(final_desc, 333*4);
		document.querySelector(".yandex-results .result-link").innerHTML = Wrap_Url(ShortenLink(final_url, 313));
		// Google
		final_url = 'https://' + final_url;
		document.querySelector(".google-results .result-title").innerHTML = WrapHtml(ShortenStr(final_title, 325*2, '20px arial'));
		document.querySelector(".google-results .result-desc").innerHTML = ShortenStr(final_desc, 325*4);	
		document.querySelector(".google-results .result-link").innerHTML = Wrap_Url(ShortenLink(final_url, 305));
		// Bing
		document.querySelector(".bing-results .result-title").innerHTML = WrapHtml(ShortenStr(final_title, 325*2, '20px roboto'));
		document.querySelector(".bing-results .result-desc").innerHTML = ShortenStr(final_desc, 325*4, '14px roboto');
		document.querySelector(".bing-results .result-link").innerHTML = Wrap_Url(ShortenLink(final_url, 327, '14px roboto'));	
	}
}

// Output results
function GetCode() {
	var final_title = document.getElementById('title').value;
	var final_desc = document.getElementById('desc').value;
	var breadcrumb = GetBreadcrumb();
	// META block
	var value = '<li><snap class="comment">&lt;!-- Add this code to the &lt;head&gt; section --&gt;</snap></li>';
	value += '<li><snap class="tag">&lt;title&gt;</snap>' + final_title + '<snap class="tag">&lt;/title&gt;</snap></li>';
	value += '<li><snap class="tag">&lt;meta</snap> <snap class="attr-name">name</snap>=<snap class="attr-str">"description"</snap> <snap class="attr-name">content</snap>=<snap class="attr-str">"' + final_desc + '"</snap><snap class="tag">&gt;</snap></li>';
	// assign the result
	document.getElementById('code-block_1').children[0].innerHTML = WrapHtml(value, 'ol');
	// All code_nav_item disabled
	var code_nav_item = document.getElementsByClassName('code-nav-item');
	for (var i = 1; i < code_nav_item.length; i++) {
		DisabledButton(code_nav_item[i].children[0], true, 'No breadcrumb');
	}
	// Breadcrumbs code
	if (breadcrumb.length > 0) {
		// Preparation
		var final_url = GetUrlArray(document.getElementById('url').value, breadcrumb);
		breadcrumb.unshift('Home');
		// *** JSON-LD block ***
		value = '<li><snap class="comment">&lt;!-- Add this code to the &lt;head&gt; element --&gt;</snap></li>';
		value += '<li><snap class="tag">&lt;script</snap> <snap class="attr-name">type</snap>=<snap class="attr-str">"application/ld+json"</snap><snap class="tag">&gt;</snap></li><li>{</li><li>	<snap class="attr-str">"@context"</snap>: <snap class="attr-str">"https://schema.org"</snap>,</li><li>	<snap class="attr-str">"@type"</snap>: <snap class="attr-str">"BreadcrumbList"</snap>,</li><li>	<snap class="attr-str">"itemListElement"</snap>: [';
		for (i = 0; i < breadcrumb.length; i++) {
			value += '{</li><li>		<snap class="attr-str">"@type"</snap>: <snap class="attr-str">"ListItem"</snap>,</li><li>		<snap class="attr-str">"position"</snap>: <snap class="attr-int">'+ (i+1) +'</snap>,</li>';
			value += (i < breadcrumb.length-1) ? '<li>		<snap class="attr-str">"name"</snap>: <snap class="attr-str">"'+ breadcrumb[i] +'"</snap>,</li><li>		<snap class="attr-str">"item"</snap>: <snap class="text-danger">"https://'+ final_url[i] +'"</snap></li><li>	},' : '<li>		<snap class="attr-str">"name"</snap>: <snap class="attr-str">"'+ breadcrumb[i] +'"</snap></li><li>	}';
		}
		value += ']</li><li>}</li><li><snap class="tag">&lt;/script&gt;</snap></li>';
		if (breadcrumb.length > 2) {
			value += '<li><snap class="comment">&lt;!-- Need to correct URLs! --&gt;</snap></li>';
		}
		// assign the result
		DisabledButton(code_nav_item[1].children[0], false);
		document.getElementById('code-block_2').children[0].innerHTML = WrapHtml(value, 'ol');
		// *** RDFa block ***
		value = '<li><snap class="comment">&lt;!-- Add this code to the &lt;body&gt; element --&gt;</snap></li>';
		value += '<li><snap class="tag">&lt;ol</snap> <snap class="attr-name">vocab</snap>=<snap class="attr-str">"https://schema.org/"</snap> <snap class="attr-name">typeof</snap>=<snap class="attr-str">"BreadcrumbList"</snap><snap class="tag">&gt;</snap></li>';
		for (i = 0; i < breadcrumb.length; i++) {
			value += '<li>	<snap class="tag">&lt;li</snap> <snap class="attr-name">property</snap>=<snap class="attr-str">"itemListElement"</snap> <snap class="attr-name">typeof</snap>=<snap class="attr-str">"ListItem"</snap><snap class="tag">&gt;</snap></li>';	
			
			value += (i < breadcrumb.length-1) ? '<li>		<snap class="tag">&lt;a</snap> <snap class="attr-name">property</snap>=<snap class="attr-str">"item"</snap> <snap class="attr-name">typeof</snap>=<snap class="attr-str">"WebPage"</snap> <snap class="attr-name">href</snap>=<snap class="text-danger">"https://'+ final_url[i] +'"</snap><snap class="tag">&gt;</snap></li><li>			<snap class="tag">&lt;span</snap> <snap class="attr-name">property</snap>=<snap class="attr-str">"name"</snap><snap class="tag">&gt;</snap>'+ breadcrumb[i] +'<snap class="tag">&lt;/snap&gt;</snap><snap class="tag">&lt;/a&gt;</snap></li><li>		<snap class="tag">&lt;meta</snap> <snap class="attr-name">property</snap>=<snap class="attr-str">"position"</snap> <snap class="attr-name">content</snap>=<snap class="attr-str">"'+ (i+1) +'"</snap><snap class="tag">&gt;</snap></li><li>	<snap class="tag">&lt;/li&gt;</snap></li><li>	›</li>' : '<li>		<snap class="tag">&lt;span</snap> <snap class="attr-name">property</snap>=<snap class="attr-str">"name"</snap><snap class="tag">&gt;</snap>'+ breadcrumb[i] +'<snap class="tag">&lt;/snap&gt;</snap></li><li>		<snap class="tag">&lt;meta</snap> <snap class="attr-name">property</snap>=<snap class="attr-str">"position"</snap> <snap class="attr-name">content</snap>=<snap class="attr-str">"'+ (i+1) +'"</snap><snap class="tag">&gt;</snap></li><li>	<snap class="tag">&lt;/li&gt;</snap></li>';

		}
		value += '<li><snap class="tag">&lt;/ol&gt;</snap></li>';
		if (breadcrumb.length > 2) {
			value += '<li><snap class="comment">&lt;!-- Need to correct URLs! --&gt;</snap></li>';
		}
		// assign the result
		DisabledButton(code_nav_item[2].children[0], false);
		document.getElementById('code-block_3').children[0].innerHTML = WrapHtml(value, 'ol');
		// *** HTML block ***
		value = '<li><snap class="comment">&lt;!-- Add this code to the &lt;body&gt; element --&gt;</snap></li>';
		value += '<li><snap class="tag">&lt;ol</snap> <snap class="attr-name">itemscope</snap> <snap class="attr-name">itemtype</snap>=<snap class="attr-str">"https://schema.org/BreadcrumbList"</snap><snap class="tag">&gt;</snap></li>';
		for (i = 0; i < breadcrumb.length; i++) {
			value += '<li>	<snap class="tag">&lt;li</snap> <snap class="attr-name">itemprop</snap>=<snap class="attr-str">"itemListElement"</snap> <snap class="attr-name">itemscope</snap> <snap class="attr-name">itemtype</snap>=<snap class="attr-str">"https://schema.org/ListItem"</snap><snap class="tag">&gt;</snap></li>';	
			
			value += (i < breadcrumb.length-1) ?
				(i==1) ? '<li>		<snap class="tag">&lt;a</snap> <snap class="attr-name">itemscope</snap> <snap class="attr-name">itemtype</snap>=<snap class="attr-str">"https://schema.org/WebPage"</snap> <snap class="attr-name">itemprop</snap>=<snap class="attr-str">"item"</snap> <snap class="attr-name">itemid</snap>=<snap class="text-danger">"https://'+ final_url[i] +  '"</snap> <snap class="attr-name">href</snap>=<snap class="attr-str">"https://'+ final_url[i] +'"</snap><snap class="tag">&gt;</snap></li><li>			<snap class="tag">&lt;span</snap> <snap class="attr-name">itemprop</snap>=<snap class="attr-str">"name"</snap><snap class="tag">&gt;</snap>'+ breadcrumb[i] +'<snap class="tag">&lt;/snap&gt;</snap><snap class="tag">&lt;/a&gt;</snap></li><li>		<snap class="tag">&lt;meta</snap> <snap class="attr-name">itemprop</snap>=<snap class="attr-str">"position"</snap> <snap class="attr-name">content</snap>=<snap class="attr-str">"'+ (i+1) +'"</snap><snap class="tag">/&gt;</snap></li><li>	<snap class="tag">&lt;/li&gt;</snap></li><li>	›</li>'
				: '<li>		<snap class="tag">&lt;a</snap> <snap class="attr-name">itemprop</snap>=<snap class="attr-str">"item"</snap> <snap class="attr-name">href</snap>=<snap class="text-danger">"https://'+ final_url[i] +'"</snap><snap class="tag">&gt;</snap></li><li>			<snap class="tag">&lt;span</snap> <snap class="attr-name">itemprop</snap>=<snap class="attr-str">"name"</snap><snap class="tag">&gt;</snap>'+ breadcrumb[i] +'<snap class="tag">&lt;/snap&gt;</snap><snap class="tag">&lt;/a&gt;</snap></li><li>		<snap class="tag">&lt;meta</snap> <snap class="attr-name">itemprop</snap>=<snap class="attr-str">"position"</snap> <snap class="attr-name">content</snap>=<snap class="attr-str">"'+ (i+1) +'"</snap><snap class="tag">/&gt;</snap></li><li>	<snap class="tag">&lt;/li&gt;</snap></li><li>	›</li>'
			: '<li>		<snap class="tag">&lt;span</snap> <snap class="attr-name">itemprop</snap>=<snap class="attr-str">"name"</snap><snap class="tag">&gt;</snap>'+ breadcrumb[i] +'<snap class="tag">&lt;/snap&gt;</snap><snap class="tag">&lt;/a&gt;</snap></li><li>		<snap class="tag">&lt;meta</snap> <snap class="attr-name">itemprop</snap>=<snap class="attr-str">"position"</snap> <snap class="attr-name">content</snap>=<snap class="attr-str">"'+ (i+1) +'"</snap><snap class="tag">/&gt;</snap></li><li>	<snap class="tag">&lt;/li&gt;</snap></li>';

		}
		value += '<li><snap class="tag">&lt;/ol&gt;</snap></li>';
		if (breadcrumb.length > 2) {
			value += '<li><snap class="comment">&lt;!-- Need to correct URLs! --&gt;</snap></li>';
		}
		// assign the result
		DisabledButton(code_nav_item[3].children[0], false);
		document.getElementById('code-block_4').children[0].innerHTML = WrapHtml(value, 'ol');
	}
}

// Prepared Mobile platform
if (window.getComputedStyle(document.getElementsByClassName('app-sidebar')[0]).zIndex >= 1100) {
	document.getElementsByName('platform')[0].checked = true;
	ChangePlatform();
}

if (document.location.hash == '#meta') {
	Select_MenuItem(document.getElementsByClassName('app-sidebar-item')[1]);
}

// Change platform SERP
function ChangePlatform(mobile) {
	mobile = (mobile === undefined) ? true : mobile;
	if (mobile) {
		addClass(document.getElementsByClassName('app-box-serp')[0], 'mobile');
	} else {
		removeClass(document.getElementsByClassName('app-box-serp')[0], 'mobile');
	}	
}

// If browser = IE9-
if (!!window.MSInputMethodContext && !!document.documentMode) {
	if (document.documentElement.lang == 'en-EN') {
		CreateMsg('Your browser is not supported', 'warning', 0);
	} else {
		CreateMsg('Ваш браузер не поддерживается', 'warning', 0);
	}
}

/*@cc_on
	CreateMsg('Your browser is not supported.', 'warning', 0);
@*/

/* Instantiate clipboard by passing a string selector */
var copy_btns = document.querySelectorAll('.app-popup_copy');
var clipboard = new ClipboardJS(copy_btns);

/* Show message */
clipboard.on('success', function(e) {
	if (document.documentElement.lang == 'en-EN') {
		CreateMsg('Text copied successfully', 'success');
	} else {
		CreateMsg('Текст успешно скопирован', 'success');
	}
});
clipboard.on('error', function(e) {
	if (document.documentElement.lang == 'en-EN') {
		CreateMsg('Error. Text not copied', 'warning');
	} else {
		CreateMsg('Ошибка. Текст не скопирован', 'warning');
	}
});
