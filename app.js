(() => {
  const demoPatient = {
    id: 'demo-001', name: 'Marina Oliveira (exemplo)', birthdate: '1962-08-14', phone: '(00) 90000-0000',
    emergencyName: 'Contato fictício', emergencyPhone: '(00) 98888-0000', history: 'Perfil demonstrativo — informação fictícia.',
    medications: 'Medicação ilustrativa A (exemplo)', allergies: 'Não informado (exemplo)', rehab: 'Em acompanhamento (exemplo)', patientNotes: '',
    updatedBy: 'Equipe (demonstração)', updatedAt: new Date().toISOString()
  };
  let patients = [demoPatient];
  let selectedId = demoPatient.id;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const initials = name => (String(name || '?').trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase());
  const selected = () => patients.find(patient => patient.id === selectedId) || null;
  const readableDate = value => {
    if (!value) return 'Não informado';
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? 'Não informado' : new Intl.DateTimeFormat('pt-BR').format(date);
  };
  const multiline = value => escapeHtml(value || 'Não informado').replace(/\n/g, '<br>');
  const setStatus = (element, text) => { if (element) element.textContent = text; };

  function updateCounters() {
    $('#patientCount').textContent = String(patients.length).padStart(2, '0');
    $('#listCount').textContent = String(patients.length).padStart(2, '0');
  }

  function renderList(filter = $('#patientSearch').value) {
    const list = $('#patientList');
    const query = String(filter || '').toLocaleLowerCase('pt-BR').trim();
    const shown = patients.filter(p => p.name.toLocaleLowerCase('pt-BR').includes(query));
    list.innerHTML = shown.length ? shown.map(p => `
      <button type="button" class="patient-list-item ${p.id === selectedId ? 'selected' : ''}" data-select-patient="${escapeHtml(p.id)}">
        <span class="list-avatar">${escapeHtml(initials(p.name))}</span><span class="list-person"><b>${escapeHtml(p.name)}</b><small>Perfil demonstrativo</small></span>
      </button>`).join('') : '<div class="empty-state" style="min-height:90px"><p>Nenhum perfil encontrado.</p></div>';
    list.querySelectorAll('[data-select-patient]').forEach(button => button.addEventListener('click', () => {
      selectedId = button.dataset.selectPatient;
      renderAll();
    }));
  }

  function renderCompanyRecord() {
    const panel = $('#companyRecord');
    const p = selected();
    if (!p) {
      panel.innerHTML = '<div class="empty-state"><span>＋</span><h4>Nenhum perfil cadastrado</h4><p>Use “Cadastrar paciente” para criar um novo perfil fictício nesta demonstração.</p></div>';
      return;
    }
    panel.innerHTML = `
      <div class="record-head"><div class="record-person"><span class="record-avatar">${escapeHtml(initials(p.name))}</span><div><h4>${escapeHtml(p.name)}</h4><p>Perfil demonstrativo · ${escapeHtml(p.phone || 'Contato não informado')}</p></div></div><div class="record-actions"><span class="record-label">EM DEMONSTRAÇÃO</span><button type="button" class="button-outline" id="editCompanyProfile">Editar perfil</button></div></div>
      <div class="record-summary">
        <div class="data-block"><span>Nascimento</span><b>${escapeHtml(readableDate(p.birthdate))}</b></div>
        <div class="data-block"><span>Contato de emergência</span><b>${escapeHtml(p.emergencyName || 'Não informado')}</b></div>
        <div class="data-block"><span>Telefone de emergência</span><b>${escapeHtml(p.emergencyPhone || 'Não informado')}</b></div>
        <div class="data-block wide"><span>Histórico / condição relevante</span><b>${multiline(p.history)}</b></div>
        <div class="data-block"><span>Medicações informadas</span><b>${multiline(p.medications)}</b></div>
        <div class="data-block"><span>Alergias / observações</span><b>${multiline(p.allergies)}</b></div>
        <div class="data-block"><span>Reabilitação</span><b>${multiline(p.rehab)}</b></div>
        <div class="data-block wide"><span>Informações compartilhadas pelo paciente</span><b>${multiline(p.patientNotes)}</b></div>
      </div>
      <div class="record-bottom"><span>Última atualização: ${escapeHtml(new Intl.DateTimeFormat('pt-BR', {dateStyle:'short', timeStyle:'short'}).format(new Date(p.updatedAt)))}</span><span>Atualizado por: ${escapeHtml(p.updatedBy || 'Equipe')}</span></div>`;
    $('#editCompanyProfile').addEventListener('click', () => showEditForm(p));
  }

  function showEditForm(p) {
    const old = $('#editPatientForm');
    if (old) old.remove();
    const form = document.createElement('form');
    form.id = 'editPatientForm';
    form.className = 'form-card register-form';
    form.innerHTML = `
      <div class="form-heading"><div><span class="portal-overline">ATUALIZAR PERFIL</span><h3>Editar dados demonstrativos</h3><p>Alterações disponíveis somente durante esta sessão local.</p></div><button type="button" class="icon-button" id="closeEdit" aria-label="Fechar edição">×</button></div>
      <div class="form-grid">
        <label>Nome<input name="name" required maxlength="80" value="${escapeHtml(p.name)}"></label>
        <label>Data de nascimento<input name="birthdate" type="date" value="${escapeHtml(p.birthdate)}"></label>
        <label>Telefone de contato<input name="phone" type="tel" maxlength="24" value="${escapeHtml(p.phone)}"></label>
        <label>Contato de emergência<input name="emergencyName" maxlength="80" value="${escapeHtml(p.emergencyName)}"></label>
        <label>Telefone de emergência<input name="emergencyPhone" type="tel" maxlength="24" value="${escapeHtml(p.emergencyPhone)}"></label>
        <label>Histórico / condição relevante<textarea name="history" rows="2" maxlength="400">${escapeHtml(p.history)}</textarea></label>
        <label>Medicações informadas<textarea name="medications" rows="2" maxlength="400">${escapeHtml(p.medications)}</textarea></label>
        <label>Alergias ou observações<textarea name="allergies" rows="2" maxlength="300">${escapeHtml(p.allergies)}</textarea></label>
        <label>Reabilitação<textarea name="rehab" rows="2" maxlength="300">${escapeHtml(p.rehab)}</textarea></label>
      </div><div class="form-actions"><button type="button" class="button button-quiet" id="cancelEdit">Cancelar</button><button class="button button-primary" type="submit">Salvar nesta sessão <span>→</span></button></div>`;
    $('#companyPanel').append(form);
    const close = () => form.remove();
    $('#closeEdit').addEventListener('click', close);
    $('#cancelEdit').addEventListener('click', close);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      Object.assign(p, Object.fromEntries(data.entries()), {updatedBy:'Equipe (demonstração)', updatedAt:new Date().toISOString()});
      form.remove();
      renderAll();
    });
    form.scrollIntoView({behavior:'smooth', block:'center'});
  }

  function renderPicker() {
    const picker = $('#patientPicker');
    const previous = selectedId;
    if (!patients.length) {
      picker.innerHTML = '<option value="">Nenhum perfil disponível</option>';
      picker.disabled = true;
      return;
    }
    picker.disabled = false;
    picker.innerHTML = patients.map(p => `<option value="${escapeHtml(p.id)}" ${p.id === previous ? 'selected' : ''}>${escapeHtml(p.name)}</option>`).join('');
    picker.value = patients.some(p => p.id === previous) ? previous : patients[0].id;
    selectedId = picker.value;
  }

  function renderPatientRecord() {
    const panel = $('#patientRecord');
    const p = selected();
    if (!p) {
      panel.innerHTML = '<div class="empty-state"><span>♡</span><h4>Seu perfil aparecerá aqui</h4><p>Peça à instituição para cadastrar um perfil demonstrativo primeiro.</p></div>';
      return;
    }
    panel.innerHTML = `
      <div class="patient-welcome"><span class="record-avatar">${escapeHtml(initials(p.name))}</span><div><h4>Olá, ${escapeHtml(p.name.split(' ')[0])}</h4><p>Este é um perfil de exemplo. Confira as informações e compartilhe atualizações fictícias.</p></div></div>
      <h4 class="patient-section-title">Informações atuais</h4>
      <div class="patient-readonly">
        <div class="data-block"><span>Nascimento</span><b>${escapeHtml(readableDate(p.birthdate))}</b></div>
        <div class="data-block"><span>Histórico / condição</span><b>${multiline(p.history)}</b></div>
        <div class="data-block"><span>Medicações</span><b>${multiline(p.medications)}</b></div>
      </div>
      <h4 class="patient-section-title">Complementar informações</h4>
      <form id="patientShareForm" class="patient-edit-grid">
        <label>Contato de emergência<input name="emergencyName" maxlength="80" value="${escapeHtml(p.emergencyName)}" placeholder="Nome do contato"></label>
        <label>Telefone de emergência<input name="emergencyPhone" type="tel" maxlength="24" value="${escapeHtml(p.emergencyPhone)}" placeholder="(00) 00000-0000"></label>
        <label>Medicações que deseja informar<textarea name="medications" maxlength="400" placeholder="Uma informação por linha">${escapeHtml(p.medications)}</textarea></label>
        <label>Alergias ou observações<textarea name="allergies" maxlength="300" placeholder="Informação fictícia">${escapeHtml(p.allergies)}</textarea></label>
        <label>Como está sua reabilitação?<textarea name="rehab" maxlength="300" placeholder="Ex.: acompanhamento demonstrativo">${escapeHtml(p.rehab)}</textarea></label>
        <label>Outra informação que deseja compartilhar<textarea name="patientNotes" maxlength="400" placeholder="Escreva uma atualização fictícia">${escapeHtml(p.patientNotes)}</textarea></label>
        <div class="patient-save-row" style="grid-column:1/-1"><small>Salvo somente na memória desta página nesta demonstração.</small><button class="button button-primary button-small" type="submit">Salvar atualização <span>→</span></button></div>
      </form>`;
    $('#patientShareForm').addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      Object.assign(p, Object.fromEntries(data.entries()), {updatedBy:'Paciente (demonstração)', updatedAt:new Date().toISOString()});
      renderAll();
      const patientTab = $('#patientTab');
      if (patientTab) patientTab.focus();
      const message = document.createElement('div');
      message.className = 'portal-notice';
      message.setAttribute('role','status');
      message.innerHTML = '<span>✓</span><p><b>Atualização demonstrativa salva.</b> Os dados permanecem apenas nesta sessão do navegador.</p>';
      $('#patientPanel').insertBefore(message, $('#patientRecord'));
      window.setTimeout(() => message.remove(), 4500);
    });
  }

  function renderAll() {
    updateCounters();
    renderList();
    renderPicker();
    renderCompanyRecord();
    renderPatientRecord();
  }

  $$('.role-tab').forEach(tab => tab.addEventListener('click', () => {
    $$('.role-tab').forEach(other => {
      const active = other === tab;
      other.classList.toggle('active', active);
      other.setAttribute('aria-selected', String(active));
      $(`#${other.dataset.role}Panel`).hidden = !active;
    });
  }));

  const registerForm = $('#registerForm');
  const showRegister = () => { registerForm.hidden = false; registerForm.scrollIntoView({behavior:'smooth', block:'center'}); $('input[name="name"]', registerForm).focus(); };
  const hideRegister = () => { registerForm.hidden = true; registerForm.reset(); };
  $('#openRegister').addEventListener('click', showRegister);
  $('#closeRegister').addEventListener('click', hideRegister);
  $('#cancelRegister').addEventListener('click', hideRegister);
  registerForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(registerForm);
    const p = Object.fromEntries(data.entries());
    p.id = `demo-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    p.rehab = 'Não informado';
    p.patientNotes = '';
    p.updatedBy = 'Equipe (demonstração)';
    p.updatedAt = new Date().toISOString();
    patients.unshift(p);
    selectedId = p.id;
    hideRegister();
    renderAll();
  });
  $('#patientSearch').addEventListener('input', event => renderList(event.target.value));
  $('#patientPicker').addEventListener('change', event => { selectedId = event.target.value; renderAll(); });

  const menu = $('#mainNav');
  $('#menuToggle').addEventListener('click', event => {
    const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
    event.currentTarget.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open', !expanded);
  });
  $$('#mainNav a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    $('#menuToggle').setAttribute('aria-expanded','false');
  }));

  renderAll();
  const requestedArea = new URLSearchParams(window.location.search).get('area');
  if (requestedArea === 'company' || requestedArea === 'patient') {
    const roleTab = document.querySelector(`[data-role="${requestedArea}"]`);
    if (roleTab) roleTab.click();
  }
})();
