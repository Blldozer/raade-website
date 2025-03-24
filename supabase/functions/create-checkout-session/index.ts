
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { corsHeaders } from '../_shared/cors.ts'
import Stripe from 'https://esm.sh/stripe@13.9.0?target=deno'

// Get stripe key from environment variable
const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

// Initialize Stripe client
const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-02-24', // Using the current stable version
  httpClient: Stripe.createFetchHttpClient(),
})

// Type definition for ticket pricing
const TICKET_PRICES = {
  student: 2500, // $25 USD
  professional: 5000, // $50 USD
  group: 4000, // $40 USD per person
}

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Create a Stripe Checkout session for conference registration
 * 
 * @param {Request} req - The incoming request
 * @returns {Response} The response with checkout session details
 */
Deno.serve(async (req) => {
  // Handle CORS for preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get request data
    const { ticketType, email, fullName, groupSize = 1, successUrl, cancelUrl } = await req.json()
    const requestId = crypto.randomUUID()
    
    console.log(`Creating checkout session [${requestId}]:`, { ticketType, email, groupSize })
    
    // Input validation
    if (!ticketType || !email || !fullName || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields',
          requestId,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
    
    // Calculate amount based on ticket type
    let unitAmount = TICKET_PRICES[ticketType]
    if (!unitAmount) {
      return new Response(
        JSON.stringify({
          error: 'Invalid ticket type',
          requestId,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
    
    // For group tickets, validate group size
    const quantity = ticketType === 'group' ? (groupSize || 1) : 1
    if (ticketType === 'group' && (!groupSize || groupSize < 2)) {
      return new Response(
        JSON.stringify({
          error: 'Group size must be at least 2',
          requestId,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }
    
    // Prepare metadata for the checkout session
    const metadata = {
      ticketType,
      email,
      fullName,
      requestId,
    }
    
    if (ticketType === 'group') {
      metadata.groupSize = String(groupSize)
    }
    
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `RAADE Conference 2025 - ${ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} Ticket`,
              description: 'Registration for RAADE African Development Forum 2025 (April 11-12, 2025)',
            },
            unit_amount: unitAmount,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: email,
      metadata,
    })
    
    console.log(`Checkout session created [${requestId}]:`, { sessionId: session.id })
    
    // Return the session ID and URL to the client
    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
        requestId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error creating checkout session:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Internal server error',
        errorType: error.type || 'unknown_error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
