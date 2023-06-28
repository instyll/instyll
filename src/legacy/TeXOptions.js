const options = [
    /* A */
    { label: "\\alpha", type: "text", apply: "\\alpha" },
    { label: "\\Alpha", type: "text", apply: "\\Alpha" },
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
    { label: "\\beth", type: "text", apply: "\\beth" },
    { label: "\\barwedge", type: "text", apply: "\\barwedge" },
    { label: "\\Bbb", type: "text", apply: "\\Bbb" },
    { label: "\\Bbbk", type: "text", apply: "\\Bbbk" },
    { label: "\\Bigg", type: "text", apply: "\\Bigg" },
    { label: "\\Big", type: "text", apply: "\\Big" },
    { label: "\\big", type: "text", apply: "\\big" },
    { label: "\\bigg", type: "text", apply: "\\bigg" },
    { label: "\\Biggl", type: "text", apply: "\\Biggl" },
    { label: "\\Bigl", type: "text", apply: "\\Bigl" },
    { label: "\\bigl", type: "text", apply: "\\bigl" },
    { label: "\\biggl", type: "text", apply: "\\biggl" },
    { label: "\\Biggm", type: "text", apply: "\\Biggm" },
    { label: "\\Bigm", type: "text", apply: "\\Bigm" },
    { label: "\\bigm", type: "text", apply: "\\bigm" },
    { label: "\\biggm", type: "text", apply: "\\biggm" },
    { label: "\\Biggr", type: "text", apply: "\\Biggr" },
    { label: "\\Bigr", type: "text", apply: "\\Bigr" },
    { label: "\\bigr", type: "text", apply: "\\bigr" },
    { label: "\\biggr", type: "text", apply: "\\biggr" },
    { label: "\\bigcap", type: "text", apply: "\\bigcap" },
    { label: "\\bigcup", type: "text", apply: "\\bigcup" }, 
    { label: "\\bigodot", type: "text", apply: "\\bigodot" },
    { label: "\\bigoplus", type: "text", apply: "\\bigoplus" },    
    { label: "\\bigotimes", type: "text", apply: "\\bigotimes" },  
    { label: "\\bigodot", type: "text", apply: "\\bigodot" },    
    { label: "\\bigupplus", type: "text", apply: "\\bigupplus" },    
    { label: "\\bigsqcupt", type: "text", apply: "\\bigsqcup" },    
    { label: "\\bigtriangledown", type: "text", apply: "\\bigtriangledown" },    
    { label: "\\bigtriangleup", type: "text", apply: "\\bigtriangleup" },    
    { label: "\\biguplus", type: "text", apply: "\\biguplus" },   
    { label: "\\bigvee", type: "text", apply: "\\bigvee" },   
    { label: "\\bigwedge", type: "text", apply: "\\bigwedge" },  
    { label: "\\bigsqcup", type: "text", apply: "\\bigsqcup" },  
    { label: "\\bigcap", type: "text", apply: "\\bigcap" },   
    { label: "\\begin{aligned}", type: "text", apply: "\\begin{aligned}" },
    { label: "\\begin{matrix}", type: "text", apply: "\\begin{matrix}" },
    { label: "\\begin{array}{cc}", type: "text", apply: "\\begin{array}{cc}" },
    { label: "\\begin{pmatrix}", type: "text", apply: "\\begin{pmatrix}" },
    { label: "\\begin{bmatrix}", type: "text", apply: "\\begin{bmatrix}" },
    { label: "\\begin{Bmatrix}", type: "text", apply: "\\begin{Bmatrix}" },
    { label: "\\begin{vmatrix}", type: "text", apply: "\\begin{vmatrix}" },
    { label: "\\begin{Vmatrix}", type: "text", apply: "\\begin{Vmatrix}" },
    { label: "\\breve{}", type: "text", apply: "\\breve{}" },
    { label: "\\Beta", type: "text", apply: "\\Beta" },
    { label: "\\beta", type: "text", apply: "\\beta" },
    { label: "\\Bbbk", type: "text", apply: "\\Bbbk" },
    { label: "\\bcancel{}", type: "text", apply: "\\bcancel{}" },
    { label: "\\boxed{}", type: "text", apply: "\\boxed{}" },
    { label: "\\because", type: "text", apply: "\\because" },


    // C
    { label: "\\coprod", type: "text", apply: "\\coprod" },
    { label: "\\cdot", type: "text", apply: "\\cdot" },
    { label: "\\centerdot", type: "text", apply: "\\centerdot" },
    { label: "\\circ", type: "text", apply: "\\circ" },
    { label: "\\circledast", type: "text", apply: "\\circledast" },
    { label: "\\circledcirc", type: "text", apply: "\\circledcirc" },
    { label: "\\circleddash", type: "text", apply: "\\circleddash" },
    { label: "\\Cup", type: "text", apply: "\\Cup" },
    { label: "\\cup", type: "text", apply: "\\cup" },
    { label: "\\curlyvee", type: "text", apply: "\\curlyvee" },
    { label: "\\curlywedge", type: "text", apply: "\\curlywedge" },
    { label: "\\check{}", type: "text", apply: "\\check{}" },
    { label: "\\Chi", type: "text", apply: "\\Chi" },
    { label: "\\chi", type: "text", apply: "\\chi" },
    { label: "\\cnums", type: "text", apply: "\\cnums" },
    { label: "\\cancel{}", type: "text", apply: "\\cancel{}" },
    { label: "\\complement", type: "text", apply: "\\complement" },

    // D
    { label: "\\div", type: "text", apply: "\\div" },
    { label: "\\divideontimes", type: "text", apply: "\\divideontimes" },
    { label: "\\dotplus", type: "text", apply: "\\dotplus" },
    { label: "\\doublebarwedge", type: "text", apply: "\\doublebarwedge" },
    { label: "\\doublecap", type: "text", apply: "\\doublecap" },
    { label: "\\doublecup", type: "text", apply: "\\doublecup" },
    { label: "\\dot{}", type: "text", apply: "\\dot{}" },
    { label: "\\ddot{}", type: "text", apply: "\\ddot{}" },
    { label: "\\downarrow", type: "text", apply: "\\downarrow" },
    { label: "\\Downarrow", type: "text", apply: "\\Downarrow" },
    { label: "\\digamma", type: "text", apply: "\\digamma" },
    { label: "\\Delta", type: "text", apply: "\\Delta" },
    { label: "\\delta", type: "text", apply: "\\delta" },
    { label: "\\daleth", type: "text", apply: "\\daleth" },

    // E
    { label: "\\end{aligned}", type: "text", apply: "\\end{aligned}" },
    { label: "\\end{matrix}", type: "text", apply: "\\end{matrix}" },
    { label: "\\end{array}", type: "text", apply: "\\end{array}" },
    { label: "\\end{pmatrix}", type: "text", apply: "\\end{pmatrix}" },
    { label: "\\end{bmatrix}", type: "text", apply: "\\end{bmatrix}" },
    { label: "\\end{Bmatrix}", type: "text", apply: "\\end{Bmatrix}" },
    { label: "\\end{vmatrix}", type: "text", apply: "\\end{vmatrix}" },
    { label: "\\end{Vmatrix}", type: "text", apply: "\\end{Vmatrix}" },
    { label: "\\Epsilon", type: "text", apply: "\\Epsilon" },
    { label: "\\epsilon", type: "text", apply: "\\epsilon" },
    { label: "\\eta", type: "text", apply: "\\eta" },
    { label: "\\eth", type: "text", apply: "\\eth" },
    { label: "\\ell", type: "text", apply: "\\ell" },
    { label: "\\exists", type: "text", apply: "\\exists" },
    { label: "\\emptyset", type: "text", apply: "\\emptyset" },

    // F
    { label: "\\frac{}{}", type: "text", apply: "\\frac{a}{b}" },    
    { label: "\\forall", type: "text", apply: "\\forall" },
    { label: "\\Finv", type: "text", apply: "\\Finv" },

    // G
    { label: "\\gtrdot", type: "text", apply: "\\gtrdot" },
    { label: "\\grave{}", type: "text", apply: "\\grave{}" },
    { label: "\\gt", type: "text", apply: "\\gt" },
    { label: "\\Gamma", type: "text", apply: "\\Gamma" },
    { label: "\\gamma", type: "text", apply: "\\gamma" },
    { label: "\\gimel", type: "text", apply: "\\gimel" },
    { label: "\\Game", type: "text", apply: "\\Game" },
    { label: "\\gets", type: "text", apply: "\\gets" },

    // H
    { label: "\\hat{}", type: "text", apply: "\\hat{}" },
    { label: "\\hbar", type: "text", apply: "\\hbar" },
    { label: "\\hslash", type: "text", apply: "\\hslash" },

    // I
    { label: "\\infty", type: "text", apply: "\\infty" },
    { label: "\\int", type: "text", apply: "\\int" },
    { label: "\\iint", type: "text", apply: "\\iint" },
    { label: "\\iiint", type: "text", apply: "\\iiint" },
    { label: "\\intop", type: "text", apply: "\\intop" },
    { label: "\\Iota", type: "text", apply: "\\Iota" },
    { label: "\\iota", type: "text", apply: "\\iota" },
    { label: "\\imath", type: "text", apply: "\\imath" },
    { label: "\\Im", type: "text", apply: "\\Im" },
    { label: "\\image", type: "text", apply: "\\image" },
    { label: "\\in", type: "text", apply: "\\in" },
    { label: "\\isin", type: "text", apply: "\\isin" },
    { label: "\\implies", type: "text", apply: "\\implies" },
    { label: "\\impliedby", type: "text", apply: "\\impliedby" },
    { label: "\\iff", type: "text", apply: "\\iff" },
    { label: "\\intercal", type: "text", apply: "\\intercal" },

    // J
    { label: "\\jmath", type: "text", apply: "\\jmath" },

    // K
    { label: "\\Kappa", type: "text", apply: "\\Kappa" },
    { label: "\\kappa", type: "text", apply: "\\kappa" },

    // L
    { label: "\\limits", type: "text", apply: "\\limits" },
    { label: "\\leftrightarrow", type: "text", apply: "\\leftrightarrow" },
    { label: "\\log", type: "text", apply: "\\log" },
    { label: "\\lBrace", type: "text", apply: "\\lBrace" },
    { label: "\\llbracket", type: "text", apply: "\\llbracket" },
    { label: "\\lt", type: "text", apply: "\\lt" },
    { label: "\\llcorner", type: "text", apply: "\\llcorner" },
    { label: "\\lrcorner", type: "text", apply: "\\lrcorner" },
    { label: "\\lgroup", type: "text", apply: "\\lgroup" },
    { label: "\\lmoustache", type: "text", apply: "\\lmoustache" },
    { label: "\\lfloor", type: "text", apply: "\\lfloor" },
    { label: "\\lceil", type: "text", apply: "\\lceil" },
    { label: "\\lparen", type: "text", apply: "\\lparen" },
    { label: "\\lbrack", type: "text", apply: "\\lbrack" },
    { label: "\\lbrace", type: "text", apply: "\\lbrace" },
    { label: "\\langle", type: "text", apply: "\\langle" },
    { label: "\\lvert", type: "text", apply: "\\lvert" },
    { label: "\\lVert", type: "text", apply: "\\lVert" },
    { label: "\\lang", type: "text", apply: "\\lang" },
    { label: "\\left", type: "text", apply: "\\left" },
    { label: "\\lambda", type: "text", apply: "\\lambda" },
    { label: "\\land", type: "text", apply: "\\land" },
    { label: "\\lor", type: "text", apply: "\\lor" },
    { label: "\\leftthreetimes", type: "text", apply: "\\leftthreetimes" },
    { label: "\\ldotp", type: "text", apply: "\\ldotp" },
    { label: "\\lessdot", type: "text", apply: "\\lessdot" },
    { label: "\\lhd", type: "text", apply: "\\lhd" },
    { label: "\\ltimes", type: "text", apply: "\\ltimes" },

    // M
    { label: "\\mp", type: "text", apply: "\\mp" },
    { label: "\\mathring{}", type: "text", apply: "\\mathring{}" },
    { label: "\\middle", type: "text", apply: "\\middle" },
    { label: "\\Mu", type: "text", apply: "\\Mu" },
    { label: "\\mu", type: "text", apply: "\\mu" },
    { label: "\\mid", type: "text", apply: "\\mid" },
    { label: "\\mapsto", type: "text", apply: "\\mapsto" },

    // N
    { label: "\\Nu", type: "text", apply: "\\Nu" },
    { label: "\\nu", type: "text", apply: "\\nu" },
    { label: "\\nabla", type: "text", apply: "\\nabla" },
    { label: "\\N", type: "text", apply: "\\N" },
    { label: "\\natnums", type: "text", apply: "\\natnums" },
    { label: "\\nexists", type: "text", apply: "\\nexists" },
    { label: "\\notin", type: "text", apply: "\\notin" },
    { label: "\\ni", type: "text", apply: "\\ni" },
    { label: "\\notni", type: "text", apply: "\\notni" },
    { label: "\\neg", type: "text", apply: "\\neg" },

    // O
    { label: "\\oint", type: "text", apply: "\\oint" },
    { label: "\\oiint", type: "text", apply: "\\oiint" },
    { label: "\\oiiint", type: "text", apply: "\\oiiint" },
    { label: "\\overline", type: "text", apply: "\\overline" },
    { label: "\\overrightarrow{}", type: "text", apply: "\\overrightarrow{}" },
    { label: "\\overrightharpoon{}", type: "text", apply: "\\overrightharpoon{}" },
    { label: "\\Overrightarrow{}", type: "text", apply: "\\Overrightarrow{}" },
    { label: "\\overleftarrow{}", type: "text", apply: "\\overleftarrow{}" },
    { label: "\\overleftrightarrow{}", type: "text", apply: "\\overleftrightarrow{}" },
    { label: "\\overbrace{}^{\\text{}}", type: "text", apply: "\\overbrace{}^{\\text{}}" },
    { label: "\\overset{}{}", type: "text", apply: "\\overset{}{}" },
    { label: "\\omicron", type: "text", apply: "\\omicron" },
    { label: "\\Omega", type: "text", apply: "\\Omega" },
    { label: "\\omega", type: "text", apply: "\\omega" },
    { label: "\\odot", type: "text", apply: "\\odot" },
    { label: "\\ominus", type: "text", apply: "\\ominus" },
    { label: "\\oplus", type: "text", apply: "\\oplus" },
    { label: "\\otimes", type: "text", apply: "\\otimes" },
    { label: "\\oslash", type: "text", apply: "\\oslash" },

    // P
    { label: "\\prime", type: "text", apply: "\\prime" },
    { label: "\\pm", type: "text", apply: "\\pm" },
    { label: "\\prod", type: "text", apply: "\\prod" },
    { label: "\\Phi", type: "text", apply: "\\Phi" },
    { label: "\\phi", type: "text", apply: "\\phi" },
    { label: "\\psi", type: "text", apply: "\\psi" },
    { label: "\\Pi", type: "text", apply: "\\Pi" },
    { label: "\\pi", type: "text", apply: "\\pi" },
    { label: "\\partial", type: "text", apply: "\\partial" },

    // Q

    // R
    { label: "\\rhd", type: "text", apply: "\\rhd" },
    { label: "\\rBrace", type: "text", apply: "\\rBrace" },
    { label: "\\rrbracket", type: "text", apply: "\\rrbracket" },
    { label: "\\rgroup", type: "text", apply: "\\rgroup" },
    { label: "\\rmoustache", type: "text", apply: "\\rmoustache" },
    { label: "\\rfloor", type: "text", apply: "\\rfloor" },
    { label: "\\rceil", type: "text", apply: "\\rceil" },
    { label: "\\rparen", type: "text", apply: "\\rparen" },
    { label: "\\rbrack", type: "text", apply: "\\rbrack" },
    { label: "\\rbrace", type: "text", apply: "\\rbrace" },
    { label: "\\rangle", type: "text", apply: "\\rangle" },
    { label: "\\rvert", type: "text", apply: "\\rvert" },
    { label: "\\rVert", type: "text", apply: "\\rVert" },
    { label: "\\rang", type: "text", apply: "\\rang" },
    { label: "\\right", type: "text", apply: "\\right" },
    { label: "\\Rho", type: "text", apply: "\\Rho" },
    { label: "\\rho", type: "text", apply: "\\rho" },
    { label: "\\R", type: "text", apply: "\\R" },
    { label: "\\Re", type: "text", apply: "\\Re" },
    { label: "\\reals", type: "text", apply: "\\reals" },
    { label: "\\righthreetimes", type: "text", apply: "\\rightthreetimes" },
    { label: "\\rtimes", type: "text", apply: "\\rtimes" },

    // S
    { label: "\\sum", type: "text", apply: "\\sum" },
    { label: "\\Sigma", type: "text", apply: "\\Sigma" },
    { label: "\\sigma", type: "text", apply: "\\sigma" },
    { label: "\\setminus", type: "text", apply: "\\setminus" },
    { label: "\\smallsetminus", type: "text", apply: "\\smallsetminus" },
    { label: "\\sqcap", type: "text", apply: "\\sqcap" },
    { label: "\\sout{}", type: "text", apply: "\\sout{}" },
    { label: "\\stackrel{}{}", type: "text", apply: "\\stackrel{}{}" },
    { label: "\\subset", type: "text", apply: "\\subset" },
    { label: "\\supset", type: "text", apply: "\\supset" },
    { label: "\\smallint", type: "text", apply: "\\smallint" },

    // T
    { label: "\\times", type: "text", apply: "\\times" },
    { label: "\\tilde{}", type: "text", apply: "\\tilde{}" },
    { label: "\\tau", type: "text", apply: "\\tau" },
    { label: "\\Theta", type: "text", apply: "\\Theta" },
    { label: "\\theta", type: "text", apply: "\\theta" },
    { label: "\\thetasym", type: "text", apply: "\\thetasym" },
    { label: "\\tag{}", type: "text", apply: "\\tag{}" },
    { label: "\\therefore", type: "text", apply: "\\therefore" },
    { label: "\\to", type: "text", apply: "\\to" },

    // U
    { label: "\\utilde{}", type: "text", apply: "\\utilde{}" },
    { label: "\\underleftarrow{}", type: "text", apply: "\\underleftarrow{}" },
    { label: "\\underleftrightarrow{}", type: "text", apply: "\\underleftrightarrow{}" },
    { label: "\\underline{}", type: "text", apply: "\\underline{}" },
    { label: "\\underbrace{}_{\\text{}}", type: "text", apply: "\\underbrace{}_{\\text{}}" },
    { label: "\\underbar{}", type: "text", apply: "\\underbar{}" },
    { label: "\\uparrow", type: "text", apply: "\\uparrow" },
    { label: "\\Uparrow", type: "text", apply: "\\Uparrow" },
    { label: "\\updownarrow", type: "text", apply: "\\updownarrow" },
    { label: "\\Updownarrow", type: "text", apply: "\\Updownarrow" },
    { label: "\\ulcorner", type: "text", apply: "\\ulcorner" },
    { label: "\\urcorner", type: "text", apply: "\\urcorner" },
    { label: "\\Upsilon", type: "text", apply: "\\Upsilon" },
    { label: "\\upsilon", type: "text", apply: "\\upsilon" },
    { label: "\\unlhd", type: "text", apply: "\\unlhd" },
    { label: "\\unrhd", type: "text", apply: "\\unrhd" },
    { label: "\\uplus", type: "text", apply: "\\uplus" },

    // V
    { label: "\\vee", type: "text", apply: "\\vee" },
    { label: "\\veebar", type: "text", apply: "\\veebar" },
    { label: "\\vec{}", type: "text", apply: "\\vec{}" },
    { label: "\\vert", type: "text", apply: "\\vert" },
    { label: "\\Vert", type: "text", apply: "\\Vert" },
    { label: "\\varGamma", type: "text", apply: "\\varGamma" },
    { label: "\\varXi", type: "text", apply: "\\varXi" },
    { label: "\\varPhi", type: "text", apply: "\\varPhi" },
    { label: "\\varepsilon", type: "text", apply: "\\varepsilon" },
    { label: "\\varpi", type: "text", apply: "\\varpi" },
    { label: "\\varDelta", type: "text", apply: "\\varDelta" },
    { label: "\\varPi", type: "text", apply: "\\varPi" },
    { label: "\\varPsi", type: "text", apply: "\\varPsi" },
    { label: "\\varkappa", type: "text", apply: "\\varkappa" },
    { label: "\\varrho", type: "text", apply: "\\varrho" },
    { label: "\\vartheta", type: "text", apply: "\\vartheta" },
    { label: "\\varsigma", type: "text", apply: "\\varsigma" },
    { label: "\\varLambda", type: "text", apply: "\\varLambda" },
    { label: "\\varUpsilon", type: "text", apply: "\\varUpsilon" },
    { label: "\\varphi", type: "text", apply: "\\varphi" },
    { label: "\\varnothing", type: "text", apply: "\\varnothing" },

    // W
    { label: "\\widehat{}", type: "text", apply: "\\widehat{}" },
    { label: "\\widecheck{}", type: "text", apply: "\\widecheck{}" },
    { label: "\\wp", type: "text", apply: "\\wp" },
    { label: "\\weierp", type: "text", apply: "\\weierp" },
    { label: "\\wedge", type: "text", apply: "\\wedge" },
    { label: "\\wr", type: "text", apply: "\\wr" },

    // X
    { label: "\\Xi", type: "text", apply: "\\Xi" },
    { label: "\\xi", type: "text", apply: "\\xi" },
    { label: "\\xcancel{}", type: "text", apply: "\\xcancel{}" },

    // Y

    // Z
    { label: "\\Zeta", type: "text", apply: "\\Zeta" },
    { label: "\\zeta", type: "text", apply: "\\zeta" },
    { label: "\\Z", type: "text", apply: "\\Z" },
];

module.exports = options;