function toggleMenu() {
    var menu = document.getElementById("aswMenu");
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}
function adjustFontSize(multiply = 0) {
const storedPercentage = parseFloat(localStorage.getItem('fontPercentage'));
if(multiply)
{
    if (storedPercentage) {
    const newPercentage = storedPercentage + multiply;
    localStorage.setItem('fontPercentage', newPercentage);
    } else {
        const newPercentage = 1 + multiply;
        localStorage.setItem('fontPercentage', newPercentage);
    }
}
document
    .querySelectorAll("*")
    .forEach((el) => {
        if (!el.classList.contains('material-icons')) {
            let orgFontSize = parseFloat(el.getAttribute('data-asw-orgFontSize'));

            if (!orgFontSize) {
                orgFontSize = parseFloat(window.getComputedStyle(el).getPropertyValue('font-size'));
                el.setAttribute('data-asw-orgFontSize', orgFontSize);
            }
            let adjustedFontSize = orgFontSize * (parseFloat(localStorage.getItem('fontPercentage')) || 1);
            el.style['font-size'] = adjustedFontSize + 'px';
        }
    });
}


    function adjustLetterSpacing(increment = 0) {
        let isLetterSpacingEnabled = parseInt(localStorage.getItem('isLetterSpacingEnabled'));
        if(!increment)
        {
            isLetterSpacingEnabled = !isLetterSpacingEnabled;
            increment = 0.1;
        }
        if (!isLetterSpacingEnabled) {
            document
                .querySelectorAll("*")
                .forEach((el) => {
                    if (!el.classList.contains('material-icons')) {

                        let orgLetterSpacing = el.getAttribute('data-asw-orgLetterSpacing');

                        if (!orgLetterSpacing) {
                            orgLetterSpacing = el.style['letter-spacing'];
                            el.setAttribute('data-asw-orgLetterSpacing', orgLetterSpacing);
                            if (!(orgLetterSpacing)) {
                                orgLetterSpacing = 0;
                            }
                            orgLetterSpacing = parseFloat(orgLetterSpacing);
                            let newLetterSpacing = orgLetterSpacing + increment;
                            el.style['letter-spacing'] = newLetterSpacing + 'em';
                        }
                    }
                });

            localStorage.setItem('isLetterSpacingEnabled', 1);
        } else {
            document
                .querySelectorAll("*")
                .forEach((el) => {
                    if (!el.classList.contains('material-icons')) {
                        let orgLetterSpacing = el.getAttribute('data-asw-orgLetterSpacing');
                        if (orgLetterSpacing) {
                            el.style['letter-spacing'] = orgLetterSpacing;
                            el.removeAttribute('data-asw-orgLetterSpacing');
                        }
                        else
                        {
                            el.style.removeProperty('letter-spacing');
                        }
                    }
                });

                localStorage.setItem('isLetterSpacingEnabled', 0);
        }
    }

    function enableDyslexicFont(load = false) {
        let isDyslexicFontEnabled = parseInt(localStorage.getItem('isDyslexicFontEnabled'));
        if(load)
        {
            isDyslexicFontEnabled = !isDyslexicFontEnabled;
        }
        if (!isDyslexicFontEnabled) {
            document
                .querySelectorAll("*")
                .forEach((el) => {
                    if (!el.classList.contains('material-icons')) {
                        orgFontFamily = el.style['font-family'];
                        el.setAttribute('data-asw-orgFontFamily', orgFontFamily);
                        el.style['font-family'] = 'OpenDyslexic3';
                    }
                });

            localStorage.setItem('isDyslexicFontEnabled', 1);
        } else {
            document
                .querySelectorAll("*")
                .forEach((el) => {
                    if (!el.classList.contains('material-icons')) {
                        orgFontFamily = el.getAttribute('data-asw-orgFontFamily');
                        if (orgFontFamily) {
                            el.style['font-family'] = orgFontFamily;
                            el.removeAttribute('data-asw-orgFontFamily');
                        }
                        else
                        {
                            el.style.removeProperty('font-family');
                        }
                    }
                });

            localStorage.setItem('isDyslexicFontEnabled', 0);
        }
    }


    function enableBigCursor(load = false) {
        let isBigCursorEnabled = parseInt(localStorage.getItem('isBigCursorEnabled'));
        if(load)
        {
            isBigCursorEnabled = !isBigCursorEnabled;
        }
        if (!isBigCursorEnabled) {
            document
                .querySelectorAll("*")
                .forEach((el) => {
                    el.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cpath d='M429.742 319.31L82.49 0l-.231 471.744 105.375-100.826 61.89 141.083 96.559-42.358-61.89-141.083 145.549-9.25zM306.563 454.222l-41.62 18.259-67.066-152.879-85.589 81.894.164-333.193 245.264 225.529-118.219 7.512 67.066 152.878z' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E"), default`;;
                });
            localStorage.setItem('isBigCursorEnabled', 1);
        } else {
            document
                .querySelectorAll("*")
                .forEach((el) => {
                    el.style.cursor = 'default';
                });

            localStorage.setItem('isBigCursorEnabled', 0);
        }
    }


    function enableHighlightLinks(load = false) {
        let isHighlightLinks = parseInt(localStorage.getItem('isHighlightLinks'));
        if(load)
        {
            isHighlightLinks = !isHighlightLinks;
        }
        if (!isHighlightLinks) {
            document.querySelectorAll('a,button').forEach((anchor) => {
                const orgTextDecoration = anchor.style['text-decoration'];
                const orgFontWeight = anchor.style['font-weight'];
                const orgFontSize = anchor.style['font-size'];
                const orgLinkColor = anchor.style['color'];
                anchor.setAttribute('data-asw-orgLinkTextDecoration', orgTextDecoration);
                anchor.setAttribute('data-asw-orgLinkFontWeight', orgFontWeight);
                anchor.setAttribute('data-asw-orgLinkFontSize', orgFontSize);
                anchor.setAttribute('data-asw-orgLinkColor', orgLinkColor);
                anchor.style.textDecoration = 'underline';
                anchor.style.fontWeight = '800';
                anchor.style['font-size'] = parseInt(orgFontSize) * 1.1 + 'px';
                anchor.style['color'] = '#ff0000';
            });

            localStorage.setItem('isHighlightLinks', 1);
        } else {
            document.querySelectorAll('a,button').forEach((anchor) => {
                const orgTextDecoration = anchor.getAttribute('data-asw-orgLinkTextDecoration');
                const orgFontWeight = anchor.getAttribute('data-asw-orgLinkFontWeight');
                const orgFontSize = anchor.getAttribute('data-asw-orgLinkFontSize');
                const orgLinkColor = anchor.getAttribute('data-asw-orgLinkColor');
                if(orgTextDecoration)
                {
                    anchor.style.textDecoration = orgTextDecoration;
                }
                else
                {
                    anchor.style.removeProperty('text-decoration');
                }
                if(orgFontWeight)
                {
                    anchor.style.fontWeight = orgFontWeight;
                    anchor.removeAttribute('data-asw-orgLinkFontWeight');
                }
                else
                {
                    anchor.style.removeProperty('font-weight');
                }
                if(orgFontSize)
                {
                    anchor.style.fontSize = orgFontSize;
                }
                else
                {
                    anchor.style.removeProperty('font-size');
                }
                if(orgLinkColor)
                {
                    anchor.style.color = orgLinkColor;
                }
                else
                {
                    anchor.style.removeProperty('color');
                }
                anchor.removeAttribute('data-asw-orgLinkFontSize');
                anchor.removeAttribute('data-asw-orgLinkColor');
                anchor.removeAttribute('data-asw-orgLinkTextDecoration');
            });
            localStorage.setItem('isHighlightLinks', 0);
        }
    }


function enableHighlightHeadings(load = false) {
    let isHighlightHeadings = parseInt(localStorage.getItem('isHighlightHeadings'));
    if(load)
    {
        isHighlightHeadings = !isHighlightHeadings;
    }
    if (!isHighlightHeadings) {
        document.querySelectorAll('h1, h2, h3,h4,h5,h6').forEach((heading) => {
            const orgTextDecoration = heading.style['text-decoration'];
            const orgHighlightColor = heading.style['color'];
            heading.setAttribute('data-asw-orgHighlightTextDecoration', orgTextDecoration)
            heading.setAttribute('data-asw-orgHighlightColor', orgHighlightColor);
            heading.style.color = '#ff0000';
            heading.style.textDecoration = 'underline';
        });

        localStorage.setItem('isHighlightHeadings', 1);
    } else {
        document.querySelectorAll('h1, h2, h3,h4,h5,h6').forEach((heading) => {
            const orgTextDecoration = heading.getAttribute('data-asw-orgHighlightTextDecoration');
            const orgHighlightColor = heading.getAttribute('data-asw-orgHighlightColor');
            if(orgTextDecoration)
            {
                heading.style.textDecoration = orgTextDecoration;
                heading.removeAttribute('data-asw-orgHighlightTextDecoration');
            }
            else
            {
                heading.style.removeProperty('text-decoration');
            }
            if(orgHighlightColor)
            {
                heading.style.color = orgHighlightColor;
            }
            else
            {
                heading.style.removeProperty('color');
            }
            heading.removeAttribute('data-asw-orgHighlightColor');
        });

        localStorage.setItem('isHighlightHeadings', 0);
    }
}


function adjustLineHeight(increment = 0) {
    let isLineHeightEnabled = parseInt(localStorage.getItem('isLineHeightEnabled'));
    if(!increment)
    {
        isLineHeightEnabled = !isLineHeightEnabled;
        increment = 1;
    }
    if (!isLineHeightEnabled) {
        document
            .querySelectorAll("*")
            .forEach((el) => {
                if (!el.classList.contains('material-icons')) {
                    let orgLineHeight = el.getAttribute('data-asw-orgLineHeight');

                    if (!orgLineHeight) {
                        orgLineHeight = el.style['line-height'];
                        el.setAttribute('data-asw-orgLineHeight', orgLineHeight);
                        if (!orgLineHeight) {
                            orgLineHeight = 1.1;
                        }
                        orgLineHeight = parseFloat(orgLineHeight);
                        let newLineHeight = orgLineHeight + increment;
                        el.style['line-height'] = newLineHeight;
                    }
                }
            });

        localStorage.setItem('isLineHeightEnabled', 1);
    } else {
        document
            .querySelectorAll("*")
            .forEach((el) => {
                if (!el.classList.contains('material-icons')) {
                    let orgLineHeight = el.getAttribute('data-asw-orgLineHeight');
                    if (orgLineHeight) {
                        el.style['line-height'] = orgLineHeight;
                        el.removeAttribute('data-asw-orgLineHeight');
                    }
                    else{
                        el.style.removeProperty('line-height');
                    }

                }
            });

        localStorage.setItem('isLineHeightEnabled', 0);
    }
}

function adjustFontWeight(increment = 100) {
    let isFontWeightEnabled = parseInt(localStorage.getItem('isFontWeightEnabled'));
    if (increment === 100) {
        isFontWeightEnabled = !isFontWeightEnabled;
        increment = 400;
    }
    if (!isFontWeightEnabled) {
        document
        .querySelectorAll("*")
        .forEach((el) => {
            if (!el.classList.contains('material-icons')) {
            let orgBoldFontWeight = window.getComputedStyle(el).getPropertyValue('--org-bold-font-weight');
            if (!orgBoldFontWeight) {
                orgBoldFontWeight = window.getComputedStyle(el).getPropertyValue('font-weight');
                el.style.setProperty('--org-bold-font-weight', orgBoldFontWeight);
            }
            let newFontWeight = parseInt(orgBoldFontWeight) + increment;
            el.style.setProperty('font-weight', newFontWeight);
            }
        });
        localStorage.setItem('isFontWeightEnabled', 1);
    } else {
        document
        .querySelectorAll("*")
        .forEach((el) => {
            if (!el.classList.contains('material-icons')) {
            let orgBoldFontWeight = window.getComputedStyle(el).getPropertyValue('--org-bold-font-weight');
            if (orgBoldFontWeight) {
                el.style['font-weight']= orgBoldFontWeight;
            } else {
                el.style.removeProperty('font-weight');
            }
            el.style.removeProperty('--org-bold-font-weight');
            }
        });
        localStorage.setItem('isFontWeightEnabled', 0);
    }
    }

function adjustContrast(load = false) {
    let isContrastEnabled = parseInt(localStorage.getItem('isContrastEnabled'));
    if(load)
    {
        isContrastEnabled = !isContrastEnabled;
    }
    if (!isContrastEnabled) {
        document
        .querySelectorAll("h1,h2,h3,h4,h5,h6,a,span,p,li,button,img,section,article,header,footer,nav,aside,main,form,fieldset,legend,pre,abbr,address,blockquote,cite,code,del,dfn,em,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,table,th,td,tbody,thead,tfoot,tr,button,input,textarea,select,option,label,fieldset,legend,progress,figure,figcaption,mark,menu,summary,time,hr,frameset,frame,iframe")
        .forEach((el) => {
            let orgColor = el.getAttribute('data-asw-orgContrast');
            if(!orgColor)
            {
                orgColor = el.style.filter;
                el.setAttribute('data-asw-orgContrast', orgColor);
            }
            el.style["filter"] = 'contrast(200%)';
        });

        localStorage.setItem('isContrastEnabled', 1);
        } else {
            document
            .querySelectorAll("h1,h2,h3,h4,h5,h6,a,span,p,li,button,img,section,article,header,footer,nav,aside,main,form,fieldset,legend,pre,abbr,address,blockquote,cite,code,del,dfn,em,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,table,th,td,tbody,thead,tfoot,tr,button,input,textarea,select,option,label,fieldset,legend,progress,figure,figcaption,mark,menu,summary,time,hr,frameset,frame,iframe")
            .forEach((el) => {
                let orgColor = el.getAttribute('data-asw-orgContrast');
                    el.style.removeProperty('filter');
                    el.removeAttribute('data-asw-orgContrast');
            });
        localStorage.setItem('isContrastEnabled', 0);
    }
    }
    function onPageLoad() {
        adjustFontSize();
        adjustLetterSpacing();
        enableDyslexicFont(true);
        enableBigCursor(true);
        enableHighlightLinks(true);
        enableHighlightHeadings(true);
        adjustLineHeight();
        adjustFontWeight();
        adjustContrast(true);
    }
    onPageLoad();
    function reset(){
        localStorage.clear();
        onPageLoad();
    }