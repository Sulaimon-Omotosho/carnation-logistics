'use client'
import React, { useState, useRef } from 'react'
import { Button } from './ui/button'
import { ChangeStatusModal } from './dashboard/StatusChangeModal'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const PrintInvoice = ({ invoice }: any) => {
  const [showModal, setShowModal] = useState(false)

  const openPrintModal = () => {
    setShowModal(true)
  }

  const invoiceRef = useRef(null)

  const generatePDF = async () => {
    const invoiceElement = invoiceRef.current

    // Capture the div (or any element with the invoice info) as canvas
    const canvas = await html2canvas(invoiceElement!)
    const imgData = canvas.toDataURL('image/png')

    // Initialize jsPDF instance
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    })

    // Add the canvas (image) to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)

    // Download the PDF
    pdf.save('invoice.pdf')
  }

  return (
    <div className=''>
      <Button onClick={openPrintModal}>Print</Button>

      {showModal && (
        <ChangeStatusModal
          onClose={() => setShowModal(false)}
          title='Print Invoice'
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
            }}
          >
            {/* Invoice Container */}
            <div
              ref={invoiceRef}
              style={{
                position: 'relative',
                width: '500px',
                height: '700px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                paddingTop: '20px',
              }}
            >
              {/* Background Image */}
              <img
                src='/CRL Logistics invoice.jpg'
                alt='Invoice Background'
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Overlay Invoice Information */}
              <div
                style={{
                  position: 'absolute',
                  padding: '0 50px',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '2rem',
                  }}
                >
                  <h1 style={{ fontWeight: '700' }}>CRL Logistics</h1>
                  <p>#{invoice.id} </p>
                </div>
                <div style={{ backgroundColor: 'white' }}>
                  <h1
                    style={{
                      fontWeight: '800',
                      fontSize: '1.25rem',
                      textAlign: 'center',
                      paddingBottom: '1.25rem',
                    }}
                  >
                    INVOICE
                  </h1>
                  <p
                    style={{
                      fontWeight: '700',
                      fontSize: '0.875rem',
                      paddingBottom: '1.25rem',
                    }}
                  >
                    Date:{' '}
                    <span style={{ fontWeight: '400' }}>
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <div style={{ display: 'flex', paddingBottom: '1.25rem' }}>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontWeight: '700',
                          fontSize: '0.875rem',
                          marginBottom: '0',
                        }}
                      >
                        Billed to:
                      </p>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          paddingBottom: '0',
                          marginBottom: '0',
                        }}
                      >
                        {invoice.name}
                      </p>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          paddingBottom: '0',
                          marginBottom: '0',
                        }}
                      >
                        {invoice.company}
                      </p>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          paddingBottom: '0',
                          marginBottom: '0',
                        }}
                      >
                        {invoice.email}
                      </p>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          paddingBottom: '0',
                          marginBottom: '0',
                        }}
                      >
                        {invoice.phone}
                      </p>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <p
                        style={{
                          fontWeight: '700',
                          fontSize: '0.875rem',
                          marginBottom: '0',
                        }}
                      >
                        From:
                      </p>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          paddingBottom: '0',
                          marginBottom: '0',
                        }}
                      >
                        {invoice.creatorId.slice(10)}
                      </p>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          paddingBottom: '0',
                          marginBottom: '0',
                        }}
                      >
                        CRL Logistics
                      </p>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          paddingBottom: '0',
                          marginBottom: '0',
                        }}
                      >
                        info@carnationregistrars.com
                      </p>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          paddingBottom: '0',
                          marginBottom: '0',
                        }}
                      >
                        +234 808 765 4321
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#e2e8f0',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <p style={{ width: '50%', marginBottom: '0' }}>Item</p>
                    <p style={{ width: '25%', marginBottom: '0' }}>Distance</p>
                    <p
                      style={{
                        width: '25%',
                        textAlign: 'right',
                        marginBottom: '0',
                      }}
                    >
                      Amount
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.875rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <p style={{ width: '50%', marginBottom: '0' }}>
                      {invoice.product}
                    </p>
                    <p style={{ width: '25%', marginBottom: '0' }}>590 KM</p>
                    <p
                      style={{
                        width: '25%',
                        textAlign: 'right',
                        marginBottom: '0',
                      }}
                    >
                      {parseFloat(invoice.amount).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <hr
                      style={{
                        backgroundColor: 'black',
                        height: '2px',
                        width: '100%',
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        padding: '0.25rem 0.5rem',
                      }}
                    >
                      <p style={{ width: '50%', marginBottom: '0' }}></p>
                      <p style={{ width: '25%', marginBottom: '0' }}>Total</p>
                      <p
                        style={{
                          width: '25%',
                          textAlign: 'right',
                          marginBottom: '0',
                        }}
                      >
                        {parseFloat(invoice.amount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <hr
                      style={{
                        backgroundColor: 'black',
                        height: '2px',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                    <p
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '0',
                      }}
                    >
                      Payment Method:{' '}
                      <span style={{ fontWeight: '400' }}>Bank Transfer</span>
                    </p>
                    <p
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '0',
                      }}
                    >
                      Notes:{' '}
                      <span style={{ fontWeight: '400' }}>
                        Thank you for choosing us!
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={generatePDF}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '0.25rem',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#2563eb')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#3b82f6')
              }
            >
              Download Invoice as PDF
            </button>
          </div>
        </ChangeStatusModal>
      )}
    </div>
  )
}

export default PrintInvoice
