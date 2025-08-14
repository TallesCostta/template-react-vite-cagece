import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Resolvido para funcionar com ES Modules (sem __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise((res) => rl.question(q, res));

// Função que substitui ou insere uma variável no conteúdo .env
function replaceEnvVariable(content, key, value) {
  const regex = new RegExp(`^${key}=.*$`, "m");
  const line = `${key}=${value}`;
  if (regex.test(content)) {
    return content.replace(regex, line);
  } else {
    return content + `\n${line}`;
  }
}

// Função para substituir placeholders em qualquer arquivo
function replaceInFile(filePath, placeholder, value) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf-8");
    const newContent = content.replace(new RegExp(placeholder, "g"), value);
    fs.writeFileSync(filePath, newContent, "utf-8");
    console.log(`✅ Arquivo ${path.basename(filePath)} atualizado.`);
  } else {
    console.warn(`⚠️ Arquivo ${filePath} não encontrado. Pulando.`);
  }
}

(async () => {
  console.log("🔧 Configurando o template do projeto...");

  const displayName = await ask("🏷️  Nome de exibição do projeto (Ex: Meu Projeto): ");
  const baseUrl = await ask("🌐 URL base do projeto (Ex: /meu-projeto): ");
  rl.close();

  const projectName = baseUrl.startsWith("/") ? baseUrl.substring(1) : baseUrl;

  if (!projectName) {
    console.error("❌ URL base inválida. Deve começar com '/' e ter um nome. Ex: /meu-projeto");
    process.exit(1);
  }

  console.log(`🚀 O nome do projeto será: ${projectName}`);

  // --- Atualização dos arquivos .env ---
  const devEnvPath = path.join(process.cwd(), ".env.development");
  const prodEnvPath = path.join(process.cwd(), ".env.production");

  if (fs.existsSync(devEnvPath)) {
    let devContent = fs.readFileSync(devEnvPath, "utf-8");
    devContent = replaceEnvVariable(devContent, "VITE_URL_BASENAME", baseUrl);
    devContent = replaceEnvVariable(devContent, "VITE_NOME_EXIBICAO_SISTEMA", displayName);
    fs.writeFileSync(devEnvPath, devContent, "utf-8");
    console.log("✅ Arquivo .env.development atualizado.");
  } else {
    console.warn("⚠️ Arquivo .env.development não encontrado. Pulando.");
  }

  if (fs.existsSync(prodEnvPath)) {
    let prodContent = fs.readFileSync(prodEnvPath, "utf-8");
    prodContent = replaceEnvVariable(prodContent, "VITE_URL_BASENAME", baseUrl);
    prodContent = replaceEnvVariable(prodContent, "VITE_NOME_EXIBICAO_SISTEMA", displayName);
    fs.writeFileSync(prodEnvPath, prodContent, "utf-8");
    console.log("✅ Arquivo .env.production atualizado.");
  } else {
    console.warn("⚠️ Arquivo .env.production não encontrado. Pulando.");
  }

  // --- Atualização de outros arquivos de configuração ---
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const azurePipelinePath = path.join(process.cwd(), "azure-pipeline.yaml");
  const sonarPropertiesPath = path.join(process.cwd(), "sonar.properties");

  // Substitui 'nomesistema-fe'
  replaceInFile(packageJsonPath, "nomesistema-fe", projectName);
  replaceInFile(azurePipelinePath, "nomesistema-fe", projectName);

  // Substitui 'PROJECT_NAME' em sonar.properties
  replaceInFile(sonarPropertiesPath, "PROJECT_NAME", projectName);

  console.log("\n🎉 Configuração concluída! O projeto está pronto para ser usado.");
})();
