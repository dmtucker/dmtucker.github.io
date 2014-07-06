// Created by iWeb 3.0.2 local-build-20110118

function writeMovie1()
{detectBrowser();if(windowsInternetExplorer)
{document.write('<object id="id3" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="700" height="410" style="height: 410px; left: 1px; position: absolute; top: 180px; width: 700px; z-index: 1; "><param name="src" value="Media/Camp%20Concord%202010-large.m4v" /><param name="controller" value="true" /><param name="autoplay" value="false" /><param name="scale" value="tofit" /><param name="volume" value="100" /><param name="loop" value="false" /></object>');}
else if(isiPhone)
{document.write('<object id="id3" type="video/quicktime" width="700" height="410" style="height: 410px; left: 1px; position: absolute; top: 180px; width: 700px; z-index: 1; "><param name="src" value="Camp_Slideshow_files/Camp%20Concord%202010-large.jpg"/><param name="target" value="myself"/><param name="href" value="../Media/Camp%20Concord%202010-large.m4v"/><param name="controller" value="true"/><param name="scale" value="tofit"/></object>');}
else
{document.write('<object id="id3" type="video/quicktime" width="700" height="410" data="Media/Camp%20Concord%202010-large.m4v" style="height: 410px; left: 1px; position: absolute; top: 180px; width: 700px; z-index: 1; "><param name="src" value="Media/Camp%20Concord%202010-large.m4v"/><param name="controller" value="true"/><param name="autoplay" value="false"/><param name="scale" value="tofit"/><param name="volume" value="100"/><param name="loop" value="false"/></object>');}}
setTransparentGifURL('Media/transparent.gif');function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Camp_Slideshow_files/Camp_SlideshowMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');adjustLineHeightIfTooBig('id4');adjustFontSizeIfTooBig('id4');Widget.onload();fixAllIEPNGs('Media/transparent.gif');fixupIECSS3Opacity('id5');performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
