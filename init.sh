#!/bin/bash

# KLD Algeria 官网开发环境初始化脚本
# ======================================

set -e

echo "🚀 KLD Algeria 官网开发环境初始化"
echo "=================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查命令是否存在
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 已安装"
        return 0
    else
        echo -e "${RED}✗${NC} $1 未安装"
        return 1
    fi
}

# Step 1: 检查 Node.js 环境
echo ""
echo "📦 检查开发环境..."
echo "-------------------"

check_command "node" || { echo "请先安装 Node.js: https://nodejs.org/"; exit 1; }
check_command "npm" || { echo "请先安装 npm"; exit 1; }
check_command "git" || { echo "请先安装 Git"; exit 1; }

NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓${NC} Node.js 版本: $NODE_VERSION"
echo -e "${GREEN}✓${NC} npm 版本: $NPM_VERSION"

# 检查 Node.js 版本是否 >= 18
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | tr -d 'v')
if [ "$NODE_MAJOR_VERSION" -lt 18 ]; then
    echo -e "${RED}✗${NC} Node.js 版本需要 >= 18，当前版本: $NODE_VERSION"
    exit 1
fi

# Step 2: 检查并安装依赖
echo ""
echo "📥 检查项目依赖..."
echo "-------------------"

if [ -f "package.json" ]; then
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✓${NC} node_modules 已存在"
    else
        echo "正在安装依赖..."
        npm install
        echo -e "${GREEN}✓${NC} 依赖安装完成"
    fi
else
    echo -e "${YELLOW}!${NC} package.json 不存在，项目尚未初始化"
    echo "  请先运行 F001 功能：项目初始化"
fi

# Step 3: 检查环境变量
echo ""
echo "🔐 检查环境变量..."
echo "-------------------"

if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env 文件存在"
else
    if [ -f ".env.example" ]; then
        echo -e "${YELLOW}!${NC} .env 文件不存在，正在从 .env.example 创建..."
        cp .env.example .env
        echo -e "${GREEN}✓${NC} 已创建 .env 文件，请检查并填写正确的环境变量"
    else
        echo -e "${YELLOW}!${NC} .env 文件不存在"
    fi
fi

# Step 4: 检查数据库
echo ""
echo "🗄️  检查数据库..."
echo "-------------------"

if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓${NC} Docker 已安装"

    # 检查 PostgreSQL 容器是否运行
    if docker ps | grep -q "kld-postgres"; then
        echo -e "${GREEN}✓${NC} PostgreSQL 容器正在运行"
    else
        echo -e "${YELLOW}!${NC} PostgreSQL 容器未运行"
        echo "  可以运行: docker-compose up -d postgres"
    fi
else
    echo -e "${YELLOW}!${NC} Docker 未安装，请确保已配置外部 PostgreSQL 数据库"
fi

# Step 5: 检查 Prisma
echo ""
echo "🔧 检查 Prisma..."
echo "-------------------"

if [ -f "prisma/schema.prisma" ]; then
    echo -e "${GREEN}✓${NC} Prisma schema 存在"

    if [ -d "node_modules/.prisma" ]; then
        echo -e "${GREEN}✓${NC} Prisma Client 已生成"
    else
        echo "正在生成 Prisma Client..."
        npx prisma generate
        echo -e "${GREEN}✓${NC} Prisma Client 生成完成"
    fi
else
    echo -e "${YELLOW}!${NC} Prisma 尚未配置"
fi

# Step 6: 启动开发服务器
echo ""
echo "🌐 启动开发服务器..."
echo "-------------------"

if [ -f "package.json" ]; then
    if grep -q '"dev"' package.json; then
        echo "启动命令: npm run dev"
        echo ""
        echo -e "${GREEN}================================${NC}"
        echo -e "${GREEN}✓ 环境检查完成！${NC}"
        echo -e "${GREEN}================================${NC}"
        echo ""
        echo "运行以下命令启动开发服务器:"
        echo -e "${YELLOW}  npm run dev${NC}"
        echo ""
        echo "然后访问: http://localhost:3000"
    else
        echo -e "${YELLOW}!${NC} package.json 中没有 dev 脚本"
    fi
else
    echo -e "${YELLOW}!${NC} 项目尚未初始化，请先完成 F001 功能"
fi

echo ""
echo "📋 查看功能清单: cat feature_list.json"
echo "📋 查看开发进度: cat progress.md"
