const mxv = document.querySelector('.mxv')
const gxv = document.querySelector('.gxv')
const mdxv = document.querySelector('.mdxv')
const rezx = document.querySelector('.rezx')
const rxv = document.querySelector('.rxv')
const txv = document.querySelector('.txv')
const txAsXv = document.querySelector('.txAsXv')

// Code an input
function doCode() {
    // Can do from validations
    if (canDo) {
        // M si G primesc valori din input
        let M = inputs[0].value
        let G = inputs[1].value

        let M_as_list = []
        let G_as_list = []

        // Creeam 2 liste cu valorile binare
        for (i = M.length - 1; i >= 0; i--) {
            M_as_list.push(M.charAt(i))
        }

        for (i = G.length - 1; i >= 0; i--) {
            G_as_list.push(G.charAt(i))
        }

        // Formam polinomul din liste
        let M_x = Polynomial(M_as_list)
        let G_x = Polynomial(G_as_list)
        // M'x
        let M_prim_x = M_x.mul(`x^${G_x.degree()}`)

        // Catul impartirii
        let result = M_prim_x.div(G_x)
        // Restul impartirii
        let mod = M_prim_x.mod(G_x)

        // T(x) 
        let T_x = polynomToString(M_prim_x.coeff, M_prim_x.degree()) + '+ ' + polynomToString(mod.coeff, mod.degree())
        // Se formeaza polinomul
        T_x = Polynomial(T_x.toLowerCase().replace(/ /g, ''))

        // Valorile in interfata
        // M(x)
        mxv.innerHTML = polynomToStringUI(M_x.coeff, M_x.degree())
        // G(x)
        gxv.innerHTML = polynomToStringUI(G_x.coeff, G_x.degree())
        // M'(x)
        mdxv.innerHTML = polynomToStringUI(M_prim_x.coeff, M_prim_x.degree())
        // catul lui M'(x) / G(x)
        rezx.innerHTML = polynomToStringUI(result.coeff, result.degree())
        // Restul ilui M'(x) / G(x)
        rxv.innerHTML = polynomToStringUI(mod.coeff, mod.degree())
        // T(x)
        txv.innerHTML = polynomToStringUI(T_x.coeff, T_x.degree())
        // T
        txAsXv.innerHTML = getBinary(T_x.coeff, T_x.degree())
        
        // console.log(`M(x) = ${polynomToString(M_x.coeff, M_x.degree())}`)
        // console.log(`G(x) = ${polynomToString(G_x.coeff, G_x.degree())}`)
        // console.log(`M'(x) = M(x) * x^gr(G(x)) = ${polynomToString(M_prim_x.coeff, M_prim_x.degree())}`)
        // console.log(`M'(x) // G(x) = ${polynomToString(result.coeff, result.degree())}`)
        // console.log(`R(x) = ${polynomToString(mod.coeff, mod.degree())}`)
        // console.log(`T(x) = ${polynomToString(T_x.coeff, T_x.degree())}`)
        // console.log(`T(x) = ${getBinary(T_x.coeff, T_x.degree())}`)
    }
}

// T(x)
const txD = document.querySelector('.txD')
// G(x)
const gxD = document.querySelector('.gxD')
// catul lui T(x) / G(x)
const rezD = document.querySelector('.rezD')
// restul lui T(x) / G(x)
const rxD = document.querySelector('.rxD')
// M
const mxD = document.querySelector('.mxD')
const mxDasX = document.querySelector('.mxDasX')
// Status
const status = document.querySelector('.status')

// Decode an input
// Analog
function doDecode() {
    let T = inputs[2].value
    let G = inputs[3].value

    let T_as_list = []
    let G_as_list = []

    for (i = T.length - 1; i >= 0; i--) {
        T_as_list.push(T.charAt(i))
    }

    for (i = G.length - 1; i >= 0; i--) {
        G_as_list.push(G.charAt(i))
    }

    let T_x = Polynomial(T_as_list)
    let G_x = Polynomial(G_as_list)

    let result = T_x.div(G_x)
    let mod = T_x.mod(G_x)
    let mod_result = polynomToString(mod.coeff, mod.degree())

    if(mod_result == 0) {
        status.innerHTML = 'Mesajul a fost corect!'
        txD.innerHTML = polynomToStringUI(T_x.coeff, T_x.degree())
        gxD.innerHTML = polynomToStringUI(G_x.coeff, G_x.degree())
        rezD.innerHTML = polynomToStringUI(result.coeff, result.degree())
        rxD.innerHTML = polynomToStringUI(mod.coeff, mod.degree())
        mxD.innerHTML = T.substring(0, T.length - G_x.degree())
    } else {
        status.innerHTML = 'Mesajul a fost incorect!'
        txD.innerHTML = polynomToStringUI(T_x.coeff, T_x.degree())
        gxD.innerHTML = polynomToStringUI(G_x.coeff, G_x.degree())
        rezD.innerHTML = polynomToStringUI(result.coeff, result.degree())
        rxD.innerHTML = polynomToStringUI(mod.coeff, mod.degree())
        mxD.innerHTML = ''
    }
}

actionBtnCode.addEventListener('click', doCode)
actionBtnDecode.addEventListener('click', doDecode)
