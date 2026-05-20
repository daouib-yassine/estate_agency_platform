/**
 * Safely evaluates a client record and injects transaction metrics 
 * if their financial/contractual status matches 'Partiel'.
 * * @param {Object} client - The raw client record fetched from Prisma/Supabase
 * @returns {Object} The processed client record with safe fallback keys
 */
export function evaluateClientFinances(client) {
  if (!client) return null;

  // 1. Ensure notes field is treated safely as an object (handles JSONB null safety)
  const clientNotes = client.notes && typeof client.notes === 'object' ? client.notes : {};

  // 2. Extract current payment status (supporting variation handling like case sensitivity)
  const currentStatus = clientNotes.paymentStatus || '';
  const isPartiel = currentStatus.trim().toLowerCase() === 'partiel';

  // 3. Conditional evaluation injection block
  if (isPartiel) {
    // Calculate values safely using fallback defaults to prevent NaN errors
    const totalContractValue = Number(clientNotes.totalAmount) || 0;
    const paidAmount = Number(clientNotes.amountPaid) || 0;
    const calculatedBalance = Math.max(0, totalContractValue - paidAmount);

    return {
      ...client,
      remainingBalance: calculatedBalance,
      contractStatus: calculatedBalance > 0 ? 'PENDING_COLLECTION' : 'SETTLED',
      // Maintain explicit safety transparency back to the front-end components
      isPartiallyPaid: true
    };
  }

  // 4. Fallback safe defaults if the condition is not met (avoids undefined property crashes)
  return {
    ...client,
    remainingBalance: 0,
    contractStatus: 'NOT_APPLICABLE',
    isPartiallyPaid: false
  };
}

/**
 * Bulk transformation helper to evaluate arrays of client datasets
 * @param {Array} clientsList - Array of retrieved Prisma client rows
 */
export function processClientsPayload(clientsList) {
  if (!Array.isArray(clientsList)) return [];
  return clientsList.map(client => evaluateClientFinances(client));
}