<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/tandem")
 */
class TandemController extends Controller
{
    /**
     * @Route("/", name="tandem")
     */
    public function indexAction(Request $request)
    {
        return $this->render('tandem/index.html.twig', []);
    }

}