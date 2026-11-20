const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// -------- Categorias --------
export async function getCategorias() {
  const response = await fetch(`${API_URL}/categorias`);
  if (!response.ok) throw new Error("Erro ao buscar categorias");
  return await response.json();
}

export async function addCategoria(tipoCategoria) {
  const response = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipoCategoria }),
  });
  if (!response.ok) throw new Error("Erro ao adicionar categoria");
  return await response.json();
}

// -------- Insumos --------
export async function getInsumos() {
  const response = await fetch(`${API_URL}/insumos`);
  if (!response.ok) throw new Error("Erro ao buscar insumos");
  return await response.json();
}

export async function addInsumo(insumo) {
  const response = await fetch(`${API_URL}/insumos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(insumo),
  });
  if (!response.ok) throw new Error("Erro ao adicionar insumo");
  return await response.json();
}


// -------- Movimentações --------
export async function getMovimentacoes() {
  const response = await fetch(`${API_URL}/movimentacoes`);
  if (!response.ok) throw new Error("Erro ao buscar movimentações");
  return await response.json();
}

export async function addMovimentacao(mov) {
  const response = await fetch(`${API_URL}/movimentacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mov),
  });
  if (!response.ok) throw new Error("Erro ao adicionar movimentação");
  return await response.json();
}

// -------- Funcionários --------
export async function getFuncionarios() {
  const response = await fetch(`${API_URL}/funcionarios`);
  if (!response.ok) throw new Error("Erro ao buscar funcionários");
  return await response.json();
}

export async function addFuncionario(func) {
  const response = await fetch(`${API_URL}/funcionarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(func),
  });
  if (!response.ok) throw new Error("Erro ao adicionar funcionário");
  return await response.json();
}

// -------- Unidades --------
export async function getUnidades() {
  try {
    const response = await fetch(`${API_URL}/unidades`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro na API getUnidades:", error);
    return []; // fallback: retorna array vazio
  }
}

export async function addUnidade(unidade) {
  const response = await fetch(`${API_URL}/unidades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(unidade),
  });
  if (!response.ok) throw new Error("Erro ao adicionar unidade");
  return await response.json();
}

// -------- Estoques --------
export async function getEstoques() {
  const response = await fetch(`${API_URL}/dashboard`);
  if (!response.ok) throw new Error("Erro ao buscar estoques");
  return await response.json();
}

export async function addEstoque(estoque) {
  const response = await fetch(`${API_URL}/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(estoque),
  });
  if (!response.ok) throw new Error("Erro ao adicionar estoque");
  return await response.json();
}

// -------- EstoqueInsumo --------
export async function getEstoqueInsumos(estoqueId) {
  const response = await fetch(`${API_URL}/dashboard/${estoqueId}/insumos`);
  if (!response.ok) throw new Error("Erro ao buscar insumos do estoque");
  return await response.json();
}

export async function addEstoqueInsumo(estoqueId, insumo) {
  const response = await fetch(`${API_URL}/dashboard/${estoqueId}/insumos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(insumo), // { insumoId, quantidade, qtdMinima, qtdMaxima }
  });
  if (!response.ok) throw new Error("Erro ao adicionar insumo ao estoque");
  return await response.json();
}
