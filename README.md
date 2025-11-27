# 📚 Guía de Estudio: Despliegue Estático CI/CD a AWS S3

Esta guía resume el proceso final de **Despliegue Continuo (CD)**, migrando el despliegue desde AWS EC2 a **Amazon S3 (Simple Storage Service)** para hosting estático.

---

## 1. ⚙️ Configuración de AWS S3 (Hosting Estático)

El despliegue estático requiere que el bucket de Amazon S3 esté configurado como sitio web y con permisos públicos habilitados.

---

## A. 🔑 Requisito de Nomenclatura Crítico

Para utilizar un subdominio personalizado con hosting estático en S3, el nombre del bucket debe coincidir exactamente con el dominio:

| Elemento              | Valor requerido        |
| --------------------- | ---------------------- |
| Subdominio de destino | `prueba3.nachodaw.com` |
| Nombre del bucket S3  | `prueba3.nachodaw.com` |

---

## B. 🔓 Política de Bucket (Permisos Públicos)

Esta política aplica acceso público de lectura a los objetos del bucket. Debe pegarse en **Permissions → Bucket Policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::prueba3.nachodaw.com/*"
    }
  ]
}
```

### C. 🔐 Secrets IAM para GitHub Actions

En GitHub, crear dos secrets:

**Ruta:**  
`Settings → Secrets → Actions`

**Tabla de configuración:**

| Secret en GitHub        | Contenido          | Propósito      |
| ----------------------- | ------------------ | -------------- |
| `AWS_ACCESS_KEY_ID`     | Access Key del IAM | Identificación |
| `AWS_SECRET_ACCESS_KEY` | Secret Key del IAM | Autenticación  |

---

## 2. 📄 Modificación del Workflow (`.github/workflows/ci-cd.yml`)

Se modifica el Job `deploy` para desplegar en S3 usando las acciones oficiales de AWS y el comando `aws s3 sync`.

### 🚀 Código completo del Job `deploy`

```yaml
# Sustituye al antiguo despliegue en EC2

deploy:
  name: 🚀 Despliegue a S3 (CD)
  runs-on: ubuntu-latest
  needs: [test, docs]

  # FIX: Se eliminó 'environment: production' para evitar errores

  steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1

    - name: Deploy static files to S3
      run: |
        aws s3 sync . s3://prueba3.nachodaw.com/ \
          --delete \
          --exclude ".git/*" \
          --exclude "node_modules/*" \
          --exclude ".github/*"
```

#### Mergear cuando ya este todo develop en main

```bash
git checkout develop
git pull origin develop
git checkout main
git pull origin main
git merge develop
git push origin main


```

#### Poner tag al final

```bash
git tag -a v1.0.0 -m "Versión final del CI/CD funcional con despliegue a S3 y JSDoc OK."
git push origin v1.0.0
git push origin --tags // para subir todos los tags
``` 