// Troque pelo e-mail que vai receber as mensagens (o FormSubmit pede uma confirmação no primeiro envio).
var DESTINO = 'ec856b3470a94ac9980863c602f96641';
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, s = document.getElementById('status');
    if (!f.checkValidity()) { s.textContent = 'Preencha todos os campos corretamente.'; s.className = 'status erro'; return; }
    s.className = 'status'; s.textContent = 'Enviando...';
    fetch('https://formsubmit.co/ajax/' + DESTINO, {
        method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(f)
    }).then(function (r) { if (!r.ok) throw 0; f.reset(); s.className = 'status ok'; s.textContent = 'Mensagem enviada. Obrigado pelo contato!'; })
      .catch(function () { s.className = 'status erro'; s.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.'; });
});