const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000';

async function verify() {
  try {
    console.log('--- Verificando Backend Legal ---');

    // 1. Crear Cliente
    console.log('\n1. Creando Cliente...');
    const clienteRes = await axios.post(`${API_URL}/clientes`, {
      nombre: 'Juan Perez',
      email: `juan${Date.now()}@example.com`,
      telefono: '555-1234'
    });
    const clienteId = clienteRes.data.id;
    console.log('Cliente creado:', clienteId);

    // 2. Crear Expediente
    console.log('\n2. Creando Expediente...');
    const expedienteRes = await axios.post(`${API_URL}/expedientes`, {
      numeroExpediente: `EXP-${Date.now()}`,
      clienteId: clienteId,
      descripcion: 'Caso de prueba para carga múltiple'
    });
    const expedienteId = expedienteRes.data.id;
    console.log('Expediente creado:', expedienteId);

    // 3. Obtener Usuario Mock
    const userRes = await axios.get(`${API_URL}/usuarios/mock`);
    const usuarioId = userRes.data.id;

    // 4. Subir múltiples archivos
    console.log('\n3. Subiendo archivos...');
    const form = new FormData();
    form.append('titulo', 'Documentos de Prueba');
    form.append('descripcion', 'Esta es una carga de múltiples archivos');
    form.append('usuarioId', usuarioId);
    
    // Crear archivos temporales para subir
    const file1 = path.join(__dirname, 'test1.txt');
    const file2 = path.join(__dirname, 'test2.txt');
    fs.writeFileSync(file1, 'Contenido del archivo 1');
    fs.writeFileSync(file2, 'Contenido del archivo 2');
    
    form.append('files', fs.createReadStream(file1));
    form.append('files', fs.createReadStream(file2));

    const uploadRes = await axios.post(`${API_URL}/expedientes/${expedienteId}/cargas`, form, {
      headers: form.getHeaders()
    });
    console.log('Carga exitosa. ID de carga:', uploadRes.data.id);

    // 5. Verificar Listado
    console.log('\n4. Verificando listado de cargas...');
    const listRes = await axios.get(`${API_URL}/expedientes/${expedienteId}/cargas`);
    console.log('Cargas encontradas:', listRes.data.length);
    console.log('Archivos en la carga:', listRes.data[0].archivos.length);

    // 6. Verificar Resumen SSR
    console.log('\n5. Verificando resumen SSR...');
    const resumenRes = await axios.get(`${API_URL}/expedientes/${expedienteId}/resumen`);
    console.log('Resumen:', resumenRes.data);

    console.log('\n--- Verificación Completada con Éxito ---');
    
    // Limpieza
    fs.unlinkSync(file1);
    fs.unlinkSync(file2);

  } catch (err) {
    console.error('Error durante la verificación:', err.response ? err.response.data : err.message);
  }
}

verify();
