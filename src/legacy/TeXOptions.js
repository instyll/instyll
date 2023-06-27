const options = [
    /* A */
    { label: "\\alpha", type: "text", apply: "\\alpha" },
    { label: "\\acute", type: "text", apply: "\\acute" },
    { label: "\\aleph", type: "text", apply: "\\aleph" },
    { label: "\\angle", type: "text", apply: "\\angle" },
    { label: "\\amalg", type: "text", apply: "\\amalg" },
    { label: "\\And", type: "text", apply: "\\And" },
    { label: "\\approx", type: "text", apply: "\\approx" },
    { label: "\\approxeq", type: "text", apply: "\\approxeq" },
    { label: "\\array", type: "text", apply: "\\array" },
    { label: "\\arccos", type: "text", apply: "\\arccos" },
    { label: "\\arcsin", type: "text", apply: "\\arcsin" },
    { label: "\\arctan", type: "text", apply: "\\arctan" },
    { label: "\\arg", type: "text", apply: "\\arg" },
    { label: "\\arrowvert", type: "text", apply: "\\arrowvert" },
    { label: "\\Arrowvert", type: "text", apply: "\\Arrowvert" },
    { label: "\\ast", type: "text", apply: "\\ast" },
    { label: "\\asymp", type: "text", apply: "\\asymp" },
    { label: "\\atop", type: "text", apply: "\\atop" },
    { label: "\\atopwithdelims", type: "text", apply: "\\atopwithdelims" },

    /* B */

    { label: "\\backepsilon", type: "text", apply: "\\backepsilon" },
    { label: "\\backprime", type: "text", apply: "\\backprime" },
    { label: "\\backsim", type: "text", apply: "\\backsim" },
    { label: "\\backsimeq", type: "text", apply: "\\backsimeq" },
    { label: "\\backslash", type: "text", apply: "\\backslash" },
    { label: "\\bar", type: "text", apply: "\\bar" },
    { label: "\\barwedge", type: "text", apply: "\\barwedge" },
    { label: "\\Bbb", type: "text", apply: "\\Bbb" },
    { label: "\\Bbbk", type: "text", apply: "\\Bbbk" },
    { label: "\\Bigg", type: "text", apply: "\\Bigg" },
    { label: "\\Big", type: "text", apply: "\\Big" },
    { label: "\\big", type: "text", apply: "\\big" },
    { label: "\\bigg", type: "text", apply: "\\bigg" },
    { label: "\\bigcap", type: "text", apply: "\\bigcap" },
    { label: "\\bigcup", type: "text", apply: "\\bigcup" }, 
    { label: "\\bigodot", type: "text", apply: "\\bigodot" },
    { label: "\\bigoplus", type: "text", apply: "\\bigoplus" },    
    { label: "\\bigotimes", type: "text", apply: "\\bigotimes" },    
    { label: "\\bigsqcupt", type: "text", apply: "\\bigsqcup" },    
    { label: "\\bigtriangledown", type: "text", apply: "\\bigtriangledown" },    
    { label: "\\bigtriangleup", type: "text", apply: "\\bigtriangleup" },    
    { label: "\\biguplus", type: "text", apply: "\\biguplus" },   
    { label: "\\bigvee", type: "text", apply: "\\bigvee" },   
    { label: "\\begin{aligned}", type: "text", apply: "\\begin{aligned}" },
    { label: "\\breve{}", type: "text", apply: "\\breve{}" },


    // C
    { label: "\\check{}", type: "text", apply: "\\check{}" },

    // D
    { label: "\\dot{}", type: "text", apply: "\\dot{}" },
    { label: "\\ddot{}", type: "text", apply: "\\ddot{}" },
    { label: "\\downarrow", type: "text", apply: "\\downarrow" },

    // E
    { label: "\\end{aligned}", type: "text", apply: "\\end{aligned}" },

    // F
    { label: "\\frac{}{}", type: "text", apply: "\\frac{a}{b}" },    
    { label: "\\forall", type: "text", apply: "\\forall" },

    // G
    { label: "\\grave{}", type: "text", apply: "\\grave{}" },

    // H
    { label: "\\hat", type: "text", apply: "\\hat{}" },

    // I
    { label: "\\infty", type: "text", apply: "\\infty" },
    { label: "\\int", type: "text", apply: "\\int" },
    { label: "\\iint", type: "text", apply: "\\iint" },
    { label: "\\iiint", type: "text", apply: "\\iiint" },

    // J

    // K

    // L
    { label: "\\limits", type: "text", apply: "\\limits" },
    { label: "\\log", type: "text", apply: "\\log" },

    // M
    { label: "\\mathring{}", type: "text", apply: "\\mathring{}" },

    // N

    // O
    { label: "\\oint", type: "text", apply: "\\oint" },
    { label: "\\overline", type: "text", apply: "\\overline" },
    { label: "\\overrightarrow{}", type: "text", apply: "\\overrightarrow{}" },
    { label: "\\overrightharpoon{}", type: "text", apply: "\\overrightharpoon{}" },
    { label: "\\Overrightarrow{}", type: "text", apply: "\\Overrightarrow{}" },
    { label: "\\overleftarrow{}", type: "text", apply: "\\overleftarrow{}" },
    { label: "\\overleftrightarrow{}", type: "text", apply: "\\overleftrightarrow{}" },
    { label: "\\overbrace{}", type: "text", apply: "\\overbrace{}" },

    // P
    { label: "\\prime", type: "text", apply: "\\prime" },


    // Q

    // R

    // S
    { label: "\\sum", type: "text", apply: "\\sum" },

    // T
    { label: "\\tilde{}", type: "text", apply: "\\tilde{}" },

    // U
    { label: "\\utilde{}", type: "text", apply: "\\utilde{}" },
    { label: "\\underleftarrow{}", type: "text", apply: "\\underleftarrow{}" },
    { label: "\\underleftrightarrow{}", type: "text", apply: "\\underleftrightarrow{}" },
    { label: "\\underline{}", type: "text", apply: "\\underline{}" },
    { label: "\\underbrace{}", type: "text", apply: "\\underbrace{}" },
    { label: "\\underbar{}", type: "text", apply: "\\underbar{}" },
    { label: "\\uparrow", type: "text", apply: "\\uparrow" },
    { label: "\\updownarrow", type: "text", apply: "\\updownarrow" },

    // V
    { label: "\\vec{}", type: "text", apply: "\\vec{}" },

    // W
    { label: "\\widehat{}", type: "text", apply: "\\widehat{}" },
    { label: "\\widecheck{}", type: "text", apply: "\\widecheck{}" },

    // X

    // Y

    // Z
];

module.exports = options;