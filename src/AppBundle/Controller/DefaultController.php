<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig', []);
    }

    /**
     * @Route("/user-profile", name="user-profile")
     */
    public function userProfileAction(Request $request)
    {
        return $this->render('default/user-profile.html.twig', []);
    }

    /**
     * @Route("/friends", name="friends")
     */
    public function friendsAction(Request $request)
    {
        return $this->render('default/friends.html.twig', []);
    }
}