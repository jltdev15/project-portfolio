<template>
  <div class="min-h-screen bg-black text-[#F7F9F9]">
    <!-- Header Bar -->
    <div class="sticky top-0 z-50 bg-black border-b border-[#2F3336]">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="text-xl font-bold">Project Billing</h1>
        <button
          @click="openAddProjectModal"
          class="px-4 py-2 text-sm font-medium text-white bg-[#1D9BF0] rounded-full hover:bg-[#1a8cd8] transition-colors duration-150"
        >
          Add Project
        </button>
      </div>
    </div>

    <!-- Breadcrumbs -->
    <div class="sticky top-[57px] z-40 bg-black border-b border-[#2F3336]">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <nav class="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
          <NuxtLink
            to="/admin"
            class="text-[#71767A] hover:text-[#F7F9F9] transition-colors duration-150 flex items-center"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NuxtLink>
          <svg class="w-4 h-4 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-[#F7F9F9] font-medium">Project Billing</span>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div v-if="billingProjectsLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#2F3336] border-t-[#1D9BF0]"></div>
      </div>

      <div v-else-if="billingProjects.length === 0" class="p-12 text-center border border-[#2F3336] rounded-lg">
        <p class="text-[#71767A]">No projects for billing. Click Add Project to get started.</p>
      </div>

      <div v-else class="border border-[#2F3336] rounded-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-[#16181C] border-b border-[#2F3336]">
            <tr>
              <th class="text-left text-sm font-semibold text-[#71767A] px-4 py-3">Title</th>
              <th class="text-left text-sm font-semibold text-[#71767A] px-4 py-3">Owner</th>
              <th class="text-left text-sm font-semibold text-[#71767A] px-4 py-3">Link</th>
              <th class="text-right text-sm font-semibold text-[#71767A] px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#2F3336]">
            <tr
              v-for="project in billingProjects"
              :key="project._id"
              class="hover:bg-[#181919] transition-colors duration-150"
            >
              <td class="px-4 py-3 text-[#F7F9F9]">{{ project.title }}</td>
              <td class="px-4 py-3 text-[#F7F9F9]">{{ project.owner }}</td>
              <td class="px-4 py-3">
                <a
                  v-if="project.linkUrl"
                  :href="project.linkUrl"
                  target="_blank"
                  class="text-[#1D9BF0] hover:underline text-sm"
                >
                  {{ project.linkUrl }}
                </a>
                <span v-else class="text-[#71767A] text-sm">—</span>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="editBillingProject(project)"
                    class="px-3 py-1.5 text-sm font-medium text-[#F7F9F9] bg-[#2F3336] rounded-full hover:bg-[#3d4144] transition-colors duration-150"
                  >
                    Update
                  </button>
                  <button
                    @click="openBillingDetailsModal(project)"
                    class="px-3 py-1.5 text-sm font-medium text-white bg-[#1D9BF0] rounded-full hover:bg-[#1a8cd8] transition-colors duration-150"
                  >
                    Generate Billing
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Billing Project Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showProjectModal"
          @click.self="closeProjectModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div class="bg-[#16181C] rounded-2xl max-w-lg w-full overflow-hidden border border-[#2F3336] shadow-2xl">
            <div class="flex items-center justify-between p-4 border-b border-[#2F3336]">
              <h2 class="text-lg font-bold text-gray-50">
                {{ editingBillingProjectId ? 'Edit Project' : 'Add Project' }}
              </h2>
              <button
                @click="closeProjectModal"
                class="p-2 rounded-full hover:bg-[#181919] transition-colors duration-150"
                title="Close"
              >
                <svg class="w-5 h-5 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="p-4">
              <form @submit.prevent="submitBillingProject" class="space-y-4">
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Title</label>
                  <input
                    v-model="projectForm.title"
                    type="text"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Project title"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Owner</label>
                  <input
                    v-model="projectForm.owner"
                    type="text"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="Owner name"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm text-[#71767A] mb-2">Link URL (optional)</label>
                  <input
                    v-model="projectForm.linkUrl"
                    type="url"
                    class="w-full px-4 py-3 bg-transparent border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:border-[#1D9BF0] focus:ring-1 focus:ring-[#1D9BF0] transition-colors"
                    placeholder="https://example.com"
                  />
                </div>
                <div v-if="projectError" class="p-3 bg-[#2F3336] border border-[#F4212E]/30 rounded-lg">
                  <p class="text-sm text-[#F4212E]">{{ projectError }}</p>
                </div>
                <div class="flex justify-end pt-2 space-x-3">
                  <button
                    type="button"
                    @click="closeProjectModal"
                    class="px-6 py-2.5 text-white font-bold rounded-full hover:bg-[#181919] focus:outline-none transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-2.5 bg-[#1D9BF0] text-white font-bold rounded-full hover:bg-[#1a8cd8] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="projectSaving"
                  >
                    <span v-if="projectSaving" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                    <span v-else>{{ editingBillingProjectId ? 'Update Project' : 'Save Project' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Billing Details Modal (Generate Billing) -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showBillingDetailsModal"
          @click.self="closeBillingDetailsModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div class="bg-[#16181C] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-[#2F3336] shadow-2xl">
            <div class="flex items-center justify-between p-4 border-b border-[#2F3336]">
              <h2 class="text-lg font-bold text-gray-50">Billing Details</h2>
              <button
                @click="closeBillingDetailsModal"
                class="p-2 rounded-full hover:bg-[#181919] transition-colors duration-150"
                title="Close"
              >
                <svg class="w-5 h-5 text-[#71767A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              <p class="text-sm text-[#71767A] mb-4">Enter the billing content below. This will appear on the generated PDF.</p>
              <form class="space-y-4" @submit.prevent="generatePdfAndClose">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-[#71767A] mb-1">Invoice / Reference Number</label>
                    <input
                      v-model="billingForm.invoiceNumber"
                      type="text"
                      placeholder="e.g. INV-2024-001"
                      class="w-full px-4 py-2.5 bg-[#16181C] border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#71767A] mb-1">Date</label>
                    <input
                      v-model="billingForm.date"
                      type="date"
                      class="w-full px-4 py-2.5 bg-[#16181C] border border-[#2F3336] rounded-lg text-[#F7F9F9] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#71767A] mb-1">Billing Period</label>
                    <input
                      v-model="billingForm.billingPeriod"
                      type="month"
                      class="w-full px-4 py-2.5 bg-[#16181C] border border-[#2F3336] rounded-lg text-[#F7F9F9] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:border-transparent"
                    />
                    <p class="mt-1 text-xs text-[#71767A]">Month this invoice covers</p>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-[#71767A] mb-1">Bill To (client name or company)</label>
                  <input
                    v-model="billingForm.billTo"
                    type="text"
                    :placeholder="billingProjectForPdf ? `e.g. ${billingProjectForPdf.owner}` : 'Client name or company'"
                    class="w-full px-4 py-2.5 bg-[#16181C] border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[#71767A] mb-1">Billing Content</label>
                  <textarea
                    v-model="billingForm.billingContent"
                    rows="6"
                    placeholder="Enter the billing description, line items, and any details you want on the invoice."
                    class="w-full px-4 py-2.5 bg-[#16181C] border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:border-transparent resize-y min-h-[120px]"
                  />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-[#71767A] mb-1">Total Amount</label>
                    <input
                      v-model="billingForm.totalAmount"
                      type="text"
                      placeholder="e.g. $1,500.00 or 1500"
                      class="w-full px-4 py-2.5 bg-[#16181C] border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#71767A] mb-1">Notes (optional)</label>
                    <input
                      v-model="billingForm.notes"
                      type="text"
                      placeholder="Payment terms, due date, etc."
                      class="w-full px-4 py-2.5 bg-[#16181C] border border-[#2F3336] rounded-lg text-[#F7F9F9] placeholder-[#71767A] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0] focus:border-transparent"
                    />
                  </div>
                </div>
                <div class="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="closeBillingDetailsModal"
                    class="px-6 py-2.5 text-white font-bold rounded-full hover:bg-[#181919] focus:outline-none transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="generatingPdf || !billingForm.billingContent.trim()"
                    class="px-6 py-2.5 text-sm font-medium text-white bg-[#1D9BF0] rounded-full hover:bg-[#1a8cd8] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <span v-if="generatingPdf" class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{{ generatingPdf ? 'Generating...' : 'Generate PDF Billing' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: false
})

interface BillingProjectItem {
  _id: string
  title: string
  owner: string
  linkUrl?: string
  createdAt?: string
}

const billingProjects = ref<BillingProjectItem[]>([])
const billingProjectsLoading = ref(true)
const showProjectModal = ref(false)
const editingBillingProjectId = ref<string | null>(null)
const projectSaving = ref(false)
const projectError = ref<string | null>(null)

const projectForm = ref({
  title: '',
  owner: '',
  linkUrl: ''
})

const showBillingDetailsModal = ref(false)
const billingProjectForPdf = ref<BillingProjectItem | null>(null)
const generatingPdf = ref(false)

const billingForm = ref({
  invoiceNumber: '',
  date: '',
  billingPeriod: '', // YYYY-MM from month input
  billTo: '',
  billingContent: '',
  totalAmount: '',
  notes: ''
})

function setDefaultBillingDate () {
  const today = new Date()
  if (!billingForm.value.date) billingForm.value.date = today.toISOString().slice(0, 10)
  if (!billingForm.value.billingPeriod) {
    billingForm.value.billingPeriod = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
  }
}

async function fetchBillingProjects () {
  billingProjectsLoading.value = true
  try {
    const data = await $fetch<BillingProjectItem[]>('/api/billing-projects')
    billingProjects.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('Failed to fetch billing projects', e)
    billingProjects.value = []
  } finally {
    billingProjectsLoading.value = false
  }
}

function openAddProjectModal () {
  editingBillingProjectId.value = null
  projectForm.value = { title: '', owner: '', linkUrl: '' }
  projectError.value = null
  showProjectModal.value = true
}

function editBillingProject (project: BillingProjectItem) {
  editingBillingProjectId.value = project._id
  projectForm.value = {
    title: project.title,
    owner: project.owner,
    linkUrl: project.linkUrl || ''
  }
  projectError.value = null
  showProjectModal.value = true
}

function closeProjectModal () {
  showProjectModal.value = false
  editingBillingProjectId.value = null
  projectForm.value = { title: '', owner: '', linkUrl: '' }
  projectError.value = null
}

async function submitBillingProject () {
  projectSaving.value = true
  projectError.value = null
  try {
    const isEdit = editingBillingProjectId.value !== null
    const url = isEdit ? `/api/billing-projects/${editingBillingProjectId.value}` : '/api/billing-projects'
    const method = isEdit ? 'PUT' : 'POST'
    await $fetch(url, {
      method,
      body: {
        title: projectForm.value.title.trim(),
        owner: projectForm.value.owner.trim(),
        linkUrl: projectForm.value.linkUrl.trim()
      }
    })
    await fetchBillingProjects()
    closeProjectModal()
  } catch (e: any) {
    projectError.value = e?.data?.message || e?.message || 'Failed to save project'
  } finally {
    projectSaving.value = false
  }
}

function openBillingDetailsModal (project: BillingProjectItem) {
  billingProjectForPdf.value = project
  setDefaultBillingDate()
  const now = new Date()
  const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  billingForm.value = {
    invoiceNumber: '',
    date: billingForm.value.date || now.toISOString().slice(0, 10),
    billingPeriod: defaultMonth,
    billTo: project.owner,
    billingContent: '',
    totalAmount: '',
    notes: ''
  }
  showBillingDetailsModal.value = true
}

function closeBillingDetailsModal () {
  showBillingDetailsModal.value = false
  billingProjectForPdf.value = null
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function formatBillingPeriod (yyyyMm: string): string {
  if (!yyyyMm || yyyyMm.length < 7) return ''
  const [y, m] = yyyyMm.split('-').map(Number)
  const monthName = MONTH_NAMES[(m || 1) - 1] || ''
  return `${monthName} ${y || ''}`.trim()
}

function loadImageAsDataUrl (src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}

async function generatePdfAndClose () {
  if (!billingForm.value.billingContent.trim() || generatingPdf.value) return
  generatingPdf.value = true
  try {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({ format: 'a4', unit: 'mm' })
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    const margin = 20
    const rightCol = pageW - margin
    let y = 18

    const gray = 100
    const lightGray = 220
    const lineH = 5
    const sectionGap = 10

    // ----- Header: two columns -----
    const logoSize = 20
    try {
      const logoDataUrl = await loadImageAsDataUrl('/images/tg.png')
      doc.addImage(logoDataUrl, 'PNG', margin, y, logoSize, logoSize)
    } catch {
      // skip logo if load fails
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(0)
    doc.text('TECHNOLOGY GURU SOLUTIONS', margin + logoSize + 5, y + 5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(gray)
    doc.text('426 Cambaog, Bustos, Bulacan', margin + logoSize + 5, y + 10)
    doc.text('Mobile Nos. 09776281665', margin + logoSize + 5, y + 14)
    doc.text('www.technologygurusolutions.com | techguru052021@gmail.com', margin + logoSize + 5, y + 18)

    // Invoice title + details block (top right, right-aligned)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(0)
    doc.text('INVOICE', rightCol, y + 6, { align: 'right' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(gray)
    let invY = y + 14
    if (billingForm.value.invoiceNumber) {
      doc.text(`Invoice No.  ${billingForm.value.invoiceNumber}`, rightCol, invY, { align: 'right' })
      invY += lineH + 1
    }
    if (billingForm.value.date) {
      doc.text(`Date  ${billingForm.value.date}`, rightCol, invY, { align: 'right' })
      invY += lineH + 1
    }
    if (billingForm.value.billingPeriod) {
      const periodLabel = formatBillingPeriod(billingForm.value.billingPeriod)
      if (periodLabel) {
        doc.text(`Billing Period  ${periodLabel}`, rightCol, invY, { align: 'right' })
        invY += lineH + 1
      }
    }
    doc.setTextColor(0)

    y += logoSize + sectionGap + 4

    // ----- Divider -----
    doc.setDrawColor(lightGray)
    doc.setLineWidth(0.5)
    doc.line(margin, y, pageW - margin, y)
    y += sectionGap

    // ----- Bill To & Project (left column) -----
    const billToX = margin
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text('BILL TO', billToX, y)
    y += lineH + 2
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    if (billingForm.value.billTo) {
      doc.text(billingForm.value.billTo, billToX, y)
      y += lineH + 2
    }
    if (billingProjectForPdf.value) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(gray)
      doc.text('Project', billToX, y)
      y += lineH
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(0)
      doc.text(
        billingProjectForPdf.value.title || billingProjectForPdf.value.linkUrl || '—',
        billToX,
        y
      )
      y += lineH + 2
    }
    doc.setTextColor(0)
    y += 4

    // ----- Description / Details box (bordered, padded) -----
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(0)
    doc.text('DESCRIPTION', margin, y)
    y += lineH + 2

    const descPadding = 6
    const contentWidth = pageW - margin * 2 - descPadding * 2
    const contentLines = doc.splitTextToSize(
      billingForm.value.billingContent.trim(),
      contentWidth
    )
    const descBoxTop = y
    const descBoxH = contentLines.length * 5 + descPadding * 2
    const descBoxBottom = descBoxTop + descBoxH

    doc.setFillColor(248, 248, 248)
    doc.rect(margin, descBoxTop, pageW - margin * 2, descBoxH, 'FD')
    doc.setDrawColor(lightGray)
    doc.setLineWidth(0.25)
    doc.rect(margin, descBoxTop, pageW - margin * 2, descBoxH)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(0)
    doc.text(contentLines, margin + descPadding, y + descPadding + 4)
    y = descBoxBottom + sectionGap

    // ----- Total row (subtle highlight strip, right-aligned amount) -----
    if (billingForm.value.totalAmount) {
      doc.setDrawColor(lightGray)
      doc.setLineWidth(0.4)
      doc.line(margin, y, pageW - margin, y)
      y += 6
      doc.setFillColor(250, 250, 250)
      doc.rect(margin, y - 2, pageW - margin * 2, 14, 'FD')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.text('TOTAL', margin + 4, y + 6)
      doc.text(billingForm.value.totalAmount, rightCol - 4, y + 6, { align: 'right' })
      y += 14
    }

    // ----- Notes (subtle) -----
    if (billingForm.value.notes) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(gray)
      const noteLines = doc.splitTextToSize(`Notes: ${billingForm.value.notes}`, pageW - margin * 2 - 8)
      doc.text(noteLines, margin, y)
      y += noteLines.length * 4 + 6
      doc.setTextColor(0)
    }

    // ----- Assignatory (Approved by: right-aligned, signature image + name) -----
    y += 24
    const sigRightX = pageW - margin
    const sigLabelY = y

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text('Approved by', sigRightX, sigLabelY, { align: 'right' })
    y += 10

    const sigImgW = 40
    const sigImgH = 18
    try {
      const sigDataUrl = await loadImageAsDataUrl('/images/e-sig-jlt.png')
      doc.addImage(
        sigDataUrl,
        'PNG',
        sigRightX - sigImgW,
        y,
        sigImgW,
        sigImgH
      )
    } catch {
      doc.setDrawColor(0)
      doc.setLineWidth(0.3)
      doc.line(sigRightX - 50, y + sigImgH / 2, sigRightX, y + sigImgH / 2)
    }
    y += sigImgH + 6

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(0)
    doc.text('John Lerry Taruc', sigRightX, y, { align: 'right' })
    y += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(gray)
    doc.text('Owner', sigRightX, y, { align: 'right' })
    doc.setTextColor(0)

    // ----- Footer line -----
    doc.setDrawColor(lightGray)
    doc.setLineWidth(0.2)
    doc.line(margin, pageH - 15, pageW - margin, pageH - 15)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(gray)
    doc.text(
      'Thank you for your business. | TECHNOLOGY GURU SOLUTIONS',
      pageW / 2,
      pageH - 10,
      { align: 'center' }
    )

    const filename = `billing-${billingForm.value.invoiceNumber || 'invoice'}-${billingForm.value.date || 'date'}.pdf`.replace(/\s/g, '-')
    doc.save(filename)
    closeBillingDetailsModal()
  } catch (e) {
    console.error('PDF generation failed', e)
  } finally {
    generatingPdf.value = false
  }
}

onMounted(() => {
  setDefaultBillingDate()
  fetchBillingProjects()
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}
</style>
